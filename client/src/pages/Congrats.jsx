import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Congrat = () => {
  const token = useSelector((state) => state?.vote?.currentVoter?.token);

  const navigate = useNavigate();

  // ACCESS CONTROL
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <section className="congrats">
      <div className="container congrats__containe">
        <h2>Thanks for you vote</h2>
        <p>
          Your vote is now added to your candidate's vote count. You will be
          redirected shortly to see the new result.
        </p>
        <Link to="/results" className="btn sm primary">
          See Results
        </Link>
      </div>
    </section>
  );
};

export default Congrat;
