import React, { useState } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  // 1️⃣ SELECT FILE
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 2️⃣ UPLOAD FILE (THIS IS WHERE YOUR CODE GOES)
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    // 🔥 THIS IS YOUR CODE LOCATION
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/analyze",
        formData
      );

      setResult(res.data);
    } catch (err) {
      console.log(err);
      alert("Backend error");
    }
  };

  return (
    <div>
      <h2>Resume Analyzer</h2>

      {/* File Upload */}
      <input type="file" onChange={handleFileChange} />

      {/* Button */}
      <button onClick={handleUpload}>
        Analyze
      </button>

      {/* Result */}
      {result && (
        <div>
          <h3>Score: {result.score}</h3>
          <p>Skills: {result.foundSkills.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default Upload;