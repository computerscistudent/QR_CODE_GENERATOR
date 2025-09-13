import React, { useState } from "react";
import "./App.css"; // Style goes in App.css

export default function QRGenerator() {
  const [url, setUrl] = useState("");
  const [qrImg, setQrImg] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error("Failed to generate QR code");

      const blob = await response.blob();
      setQrImg(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>QR Code Generator</h1>
        <input
          type="text"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input"
        />
        <button onClick={generateQR} className="button" disabled={loading}>
          {loading ? "Generating..." : "Generate QR"}
        </button>
        {error && <p className="error">{error}</p>}
        {qrImg && <img src={qrImg} alt="QR Code" className="qr-img" />}
      </div>
    </div>
  );
}
