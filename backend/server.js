// backend/server.js
// Express API for Rapid Crisis Response
// -------------------------------------------------
// 1️⃣ Load dependencies (express, cors, our in‑memory store)
// 2️⃣ Set up middleware (CORS, JSON body parsing)
// 3️⃣ Define routes: GET /api/reports, POST /api/reports
// 4️⃣ Simple health check endpoint
// 5️⃣ Start listening on port 5000 (change if needed)
// -------------------------------------------------
const express = require('express');
const cors = require('cors');
const data = require('./data');

const app = express();
const PORT = 5000; // change if you prefer another port

app.use(cors()); // allow all origins (dev only)
app.use(express.json()); // parse JSON request bodies

// GET all reports
app.get('/api/reports', (req, res) => {
  res.json(data.getAll());
});

// POST a new report
app.post('/api/reports', (req, res) => {
  const { location, description } = req.body;
  if (!location || !description) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const newReport = data.add({ location, description });
  res.status(201).json(newReport);
});

// Simple health check
app.get('/api/health', (req, res) => res.send('OK'));

app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});
