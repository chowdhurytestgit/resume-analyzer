import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Upload resume first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/analyze",
        formData
      );

      setResult(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const score = result?.score || 0;
  const found = result?.foundSkills || [];
  const missing = result?.missingSkills || [];

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">⚡ ATS AI</div>

        <nav>
          <p className="active">Dashboard</p>
          <p>Resume Analyzer</p>
          <p>Reports</p>
        </nav>

        <div className="footer">
          AI Powered ATS System
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">

        <header className="header">
          <h1>Resume Intelligence Dashboard</h1>
          <p>Analyze, optimize and improve your resume instantly</p>
        </header>

        {/* UPLOAD CARD */}
        <section className="uploadBox">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button onClick={handleUpload}>
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </section>

        {/* RESULTS */}
        {result && (
          <section className="grid">

            {/* SCORE CARD */}
            <div className="card big">
              <h3>ATS Score</h3>

              <div className="progress">
                <div
                  className="progressFill"
                  style={{ width: `${score}%` }}
                ></div>
              </div>

              <h2 className="akash">{score}%</h2>
              <p>Resume Match Quality</p>
            </div>

            {/* MATCHED */}
            <div className="card">
              <h3>Matched Skills</h3>
              <div className="tagBox">
                {found.length
                  ? found.map((s, i) => (
                      <span key={i} className="tag green">
                        {s}
                      </span>
                    ))
                  : "None"}
              </div>
            </div>

            {/* MISSING */}
            <div className="card">
              <h3>Missing Skills</h3>
              <div className="tagBox">
                {missing.length
                  ? missing.map((s, i) => (
                      <span key={i} className="tag red">
                        {s}
                      </span>
                    ))
                  : "None"}
              </div>
            </div>

          </section>
        )}

      </main>
    </div>
  );
}