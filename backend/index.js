// backend/index.js

import express from 'express';
import qr from 'qr-image';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/generate', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).send("Missing URL");

  try {
    res.setHeader('Content-Type', 'image/png');
    const qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(res);
  } catch (error) {
    res.status(500).send("Failed to generate QR code");
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

