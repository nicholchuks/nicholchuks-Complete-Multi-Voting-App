import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Function to change our control input
  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerVoter = async (e) => {
    e.preventDefault();
    // console.log("Sending voter data:", userData);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/voters/register`,
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <section className="register">
      <div className="container register__container">
        <h2>Sign Up</h2>
        <form onSubmit={registerVoter}>
          {error && <p className="form__error-message">{error}</p>}
          {/* <p className="form__error-message">This the error message</p> */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            autoComplete="true"
            autoFocus
            onChange={changeInputHandler}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="true"
            onChange={changeInputHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="true"
            onChange={changeInputHandler}
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            autoComplete="true"
            onChange={changeInputHandler}
          />
          <p>
            Already have an account? <Link to="/">Sign in</Link>{" "}
          </p>
          <button type="submit" className="btn primary">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
