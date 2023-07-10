import React from 'react'
import HashLoader from "react-spinners/HashLoader";

const override = {
    margin: "0 auto",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  
const Spinner = () => {
  return (
    <HashLoader color="#36d7b7" cssOverride={override}/>
  )
}

export default Spinner