import React, { useState, useEffect } from "react";
import ResultElection from "../components/ResultElection";
// import { elections as dummyElections } from "../data";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Results = () => {
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const [elections, setElections] = useState([]);

  const navigate = useNavigate();

  //ACCESS CONTROL
  // If the user is not logged in, redirect to the home page
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const getElections = async (e) => {
    // console.log("Token being sent:", token);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/elections`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const elections = await response.data;
      setElections(elections);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getElections();
  }, []);

  return (
    <section className="results">
      <div className="container results__container">
        {elections.map((election) => (
          <ResultElection key={election._id} {...election} />
        ))}
      </div>
    </section>
  );
};

export default Results;

// const token = useSelector((state) => state?.vote?.currentVoter?.token);
// const navigate = useNavigate();

// //ACCESS CONTROL
// useEffect(() => {
//   if (!token) {
//     navigate("/");
//   }
// }, []);

// const getElections = async (e) => {
//   // console.log("Token being sent:", token);
//   try {
//     const response = await axios.get(
//       `${process.env.REACT_APP_API_URL}/elections`,
//       {
//         withCredentials: true,
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     const elections = await response.data;
//     setElections(elections);
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   getElections();
// }, []);
// useEffect(() => {
//   if (token) {
//     getElections();
//   } else {
//     console.log("No token found, cannot fetch elections.");
//   }
// }, [token]);
