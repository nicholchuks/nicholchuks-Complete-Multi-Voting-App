const VoterModel = require("../models/voterModel");
const HttpError = require("../models/ErrorModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ''''''''''''''''REGISTER VOTER'''''''''''''''
//POST: api/voters/register
//UNPROTECTED
const registerVoter = async (req, res, next) => {
  try {
    const { fullName, email, password, password2 } = req.body;

    if (!fullName || !email || !password || !password2) {
      return next(new HttpError("All fields are required", 422));
    }

    //change email to lowercase
    const newEmail = email.toLowerCase();

    //check if email exists in the database
    const emailExists = await VoterModel.findOne({ email: newEmail });
    if (emailExists) {
      return next(new HttpError("Email already exists", 422));
    }

    //check if password is more than 6 characters
    if (password.trim().length < 6) {
      return next(new HttpError("Password must be at least 6 characters", 422));
    }

    //check if password matches password2
    if (password !== password2) {
      return next(new HttpError("Passwords do not match", 422));
    }
    //Hatch the passowrd

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    //check if the email is the admin email
    let isAdmin = false;
    if (newEmail === "achiever@gmail.com") {
      isAdmin = true;
    }

    //create a new voter and push to database
    const newVoter = await VoterModel.create({
      fullName,
      email: newEmail,
      password: hashPass,
      isAdmin,
    });

    //send response
    res.status(201).json(`New voter ${fullName} registered successfully`);
  } catch (error) {
    return next(new HttpError("Failed to register voter", 500));
  }
};

// ''''''''''''''''JWT WEB TOKEN''''
const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

// ''''''''''''''''LOGIN VOTER'''''''''''''''
//POST: api/voters/login
//UNPROTECTED

const loginVoter = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpError("Email and password are required", 422));
    }

    //change email to lowercase
    const newEmail = email.toLowerCase();

    //check if the email exist in the datatbase
    const voter = await VoterModel.findOne({ email: newEmail });
    if (!voter) {
      return next(new HttpError("Invalid Email Address", 422));
    }

    //Check if password matches
    const isMatch = await bcrypt.compare(password, voter.password);
    if (!isMatch) {
      return next(new HttpError("Password do not match", 422));
    }

    const { _id: id, isAdmin, votedElections } = voter;
    const token = generateToken({ id, isAdmin });

    //send response
    res.json({ token, id, isAdmin, votedElections });
  } catch (error) {
    return next(
      new HttpError(
        "Failed to login, Please check your credentials or try again later.",
        500
      )
    );
  }
};

// ''''''''''''''''GET VOTER'''''''''''''''
//GET: api/voters/:id
//PROTECTED
const getVoter = async (req, res, next) => {
  try {
    const { id } = req.params;
    //check if the id is valid
    if (!id) {
      return next(new HttpError("Voter ID is required", 422));
    }
    //check if the voter exists in the database
    const voter = await VoterModel.findById(id).select("-password");
    if (!voter) {
      return next(new HttpError("Voter not found", 404));
    }
    //send response
    res.json(voter);
  } catch (error) {
    return next(
      new HttpError("Failed to get voter, please try again later", 500)
    );
  }
};

module.exports = { registerVoter, loginVoter, getVoter };
