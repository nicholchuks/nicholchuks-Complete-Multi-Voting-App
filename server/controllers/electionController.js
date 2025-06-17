const { v4: uuid } = require("uuid");
const path = require("path");
// const fs = require("fs");
// const util = require("util");
const cloudinary = require("../utils/cloudinary");
const HttpError = require("../models/ErrorModel");
const ElectionModel = require("../models/electionModel");
const CandidateModel = require("../models/candidateModel");
// const VoterModel = require("../models/voterModel");

// ......................ADD NEW ELECTION.....................
// POST : api/elections

// PROTECTED (Only admin)
const addElection = async (req, res, next) => {
  try {
    //Only admin can add election
    if (!req.user.isAdmin) {
      return next(new HttpError("Only an admin can perform this action.", 403));
    }
    const { title, description } = req.body;
    if (!title || !description) {
      return next(new HttpError("Fill all fields.", 422));
    }

    if (!req.files.thumbnail) {
      return next(new HttpError("Choose a thumbnail.", 422));
    }

    const { thumbnail } = req.files;
    // image should be less tham 1mb
    if (thumbnail.size > 1000000) {
      return next(new HttpError("File size too big. Should be less than 1mb"));
    }

    // Rename the image
    let fileName = thumbnail.name;
    fileName = fileName.split(".");
    fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];

    // Upload file to upload folder
    await thumbnail.mv(
      path.join(__dirname, "..", "uploads", fileName),
      async (err) => {
        if (err) {
          return next(HttpError(err));
        }

        //  store image on cloudinary
        const result = await cloudinary.uploader.upload(
          path.join(__dirname, "..", "uploads", fileName),
          { resource_type: "image" }
        );
        if (!result.secure_url) {
          return next(
            new HttpError("Couldn't upload image to cloudinary", 422)
          );
        }

        //Save election to db
        const newElection = await ElectionModel.create({
          title,
          description,
          thumbnail: result.secure_url,
        });
        res.status(200).json(newElection);
      }
    );
  } catch (error) {
    console.error("Error adding election:", error); // 👈 add this for real debugging
    return next(new HttpError("Failed to add election", 500));
  }
};

// ......................GET ALL ELECTIONS.....................
// GET : api/elections
// PROTECTED
const getElections = async (req, res, next) => {
  try {
    const elections = await ElectionModel.find().sort({ createdAt: -1 });
    res.status(200).json(elections);
  } catch (error) {
    console.error("Error fetching elections:", error); // 👈 add this for real debugging
    return next(new HttpError("Failed to fetch elections", 500));
  }
};

// ......................GET SINGLE ELECTION.....................
// GET : api/elections/:id
// PROTECTED
const getElection = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Check if the election exists in the database
    const election = await ElectionModel.findById(id);
    if (!election) {
      return next(new HttpError("Election not found", 404));
    }
    // Send response
    res.status(200).json(election);
  } catch (error) {
    console.error("Error fetching election:", error); // 👈 add this for real debugging
    return next(new HttpError("Failed to fetch election", 404));
  }
};

// ......................GET ELECTION CANDIDATES.....................
// GET : api/elections/:id/candidates
// PROTECTED
const getCandidateOfElection = async (req, res, next) => {
  try {
    const { id } = req.params;

    const candidate = await CandidateModel.find({
      election: id,
    });
    if (!candidate) {
      return next(new HttpError("Election not found", 404));
    }
    // Send response
    res.status(200).json(candidate);
  } catch (error) {
    next(new HttpError("Failed to fetch candidates", 404));
  }
};

// ......................GET VOTER of ELECTION.....................
// GET : api/elections/:id/voters
//PROTECTED
const getElectionVoters = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await ElectionModel.findById(id).populate("voters");
    res.status(200).json(response.voters);

    // const responses = await VoterModel.find({elections: id});
    //   // Send response
    //   res.status(200).json(responses);
  } catch (error) {
    next(new HttpError("Failed to fetch voters", 404));
  }
};

// ......................UPDATE ELECTION.....................
// PATCH : api/elections/:id
// PROTECTED (only admin)
const updateElection = async (req, res, next) => {
  try {
    //Only admin can add election
    if (!req.user.isAdmin) {
      return next(new HttpError("Only an admin can perform this action.", 403));
    }
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
      return next(new HttpError("Fill in all fields.", 422));
    }
    if (req.files.thumbnail) {
      const { thumbnail } = req.files; //image size should be less than 1mb
      if (thumbnail.size > 1000000) {
        return next(
          new HttpError("Image size too big. Should be less than 1mb", 422)
        );
      }
      let fileName = thumbnail.name;
      fileName = fileName.split(".");
      fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];

      // Upload file to upload folder
      thumbnail.mv(
        path.join(__dirname, "..", "uploads", fileName),
        async (err) => {
          if (err) {
            return next(HttpError(err));
          }

          //  store image on cloudinary
          const result = await cloudinary.uploader.upload(
            path.join(__dirname, "..", "uploads", fileName),
            { resource_type: "image" }
          );

          //check if cloudinary storage was successful
          if (!result.secure_url) {
            return next(
              new HttpError(
                "Image upload to cloudinary was not successful",
                422
              )
            );
          }
          //Save election to db
          await ElectionModel.findByIdAndUpdate(id, {
            title,
            description,
            thumbnail: result.secure_url,
          });
          res.json("Election Updated Successfully");
        }
      );
    }
  } catch (error) {
    return next(new HttpError("Failed to update election", 422));
  }
};

// ......................DELETE ELECTION.....................
// DELETE : api/elections/:id
// PROTECTED (only admin)
const removeElection = async (req, res, next) => {
  try {
    //Only admin can add election
    if (!req.user.isAdmin) {
      return next(new HttpError("Only an admin can perform this action.", 403));
    }
    const { id } = req.params;
    await ElectionModel.findByIdAndDelete(id);
    //delete candidates that belong to this election
    await CandidateModel.deleteMany({ election: id });
    res.status(200).json("Election Deleted Successfully");
  } catch (error) {
    return next(new HttpError("Failed to remove election", 500));
  }
};

module.exports = {
  getElections,
  getElection,
  updateElection,
  removeElection,
  getCandidateOfElection,
  getElectionVoters,
  addElection,
};
