import React from "react";
import loading from "../loading.gif";
const Spinner =()=> {
  
    return (
      <div className="container text-center align-items-center my-3">
        <img src={loading} alt="loading" />
      </div>
    );
  
}

export default Spinner;
