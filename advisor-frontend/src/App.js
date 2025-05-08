import React, { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
    setStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://advisor-backend.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setDownloadUrl(data.downloadUrl);
        setStatus("Completed!");
      } else {
        throw new Error("Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Upload failed.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Advisor Transfer Dashboard</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} style={{ marginLeft: "1rem" }}>
        Upload Form
      </button>
      <p>Status: {status}</p>
      {downloadUrl && (
        <p>
          Download filled form: <a href={downloadUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
        </p>
      )}
    </div>
  );
}