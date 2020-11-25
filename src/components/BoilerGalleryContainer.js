import { Component, useEffect, useState } from "react";
import "./Library.css";
import BoilerGallery from "./BoilerGallery.js";
import UploadForm from "./UploadForm";

function BoilerGalleryContainer() {
  const [boilers, setBoilers] = useState([]);

  useEffect(() => {
    const refreshBoilers = async () => {
      const res = await fetch("http://localhost:5000/boilers");
      const parseRes = await res.json();
      setBoilers(parseRes);
    }
    refreshBoilers();
  }, []);

  return (
    <div className="wrapper">
      <form>
        <input
          className="input"
          type="text"
          id="search"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ex. React, Flask, Angular..."
        ></input>
      </form>
      <UploadForm setBoilers={setBoilers} />
      <BoilerGallery values={boilers} />
    </div>
  )

}

export default BoilerGalleryContainer;