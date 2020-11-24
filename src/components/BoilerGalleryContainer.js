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
    <>
      <UploadForm setBoilers={setBoilers} />
      <BoilerGallery values={boilers} />
    </>
  )

}

export default BoilerGalleryContainer;