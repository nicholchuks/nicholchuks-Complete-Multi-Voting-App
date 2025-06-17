import React from "react";
import Spiner from "../assets/loader.gif";

const Loader = () => {
  return (
    <section className="loader">
      <div className="loader__container">
        <img src={Spiner} alt="Loading Spiner" />
      </div>
    </section>
  );
};

export default Loader;
