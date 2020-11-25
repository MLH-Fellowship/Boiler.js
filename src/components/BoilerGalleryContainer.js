import { Component, useEffect, useState } from "react";
import "./Library.css";
import BoilerGallery from "./BoilerGallery.js";
import UploadForm from "./UploadForm";

function BoilerGalleryContainer(props) {
  const [boilers, setBoilers] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    const refreshBoilers = async () => {
      var api = search;
      if (api === undefined || api === "")
        api = "http://localhost:5000/boilers/query/ /";
      else api = `http://localhost:5000/boilers/query/${search}/`;

      const res = await fetch(api)
      const parseRes = await res.json()

      setBoilers(parseRes);
    }
    refreshBoilers();
  }, [search]);
  

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