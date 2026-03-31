const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth.routes');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('SaathiLearn API is running...');
});

// Tracks whether MongoDB is reachable. Backend should stay up even if MongoDB is down.
let mongoReady = false;
app.locals.mongoReady = mongoReady;

// Health route
app.get('/ping', (req, res) => {
  res.send(app.locals.mongoReady ? 'Backend is alive' : 'Backend is alive (MongoDB not connected)');
});

// API routes
app.use('/api/auth', authRoutes);

// Error handling
app.use(errorHandler);

// Don't crash the whole backend if MongoDB is temporarily unavailable.
// Keep retrying so the backend recovers automatically when Mongo starts later.
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const MONGO_RETRY_MS = Number.parseInt(process.env.MONGO_RETRY_MS || '5000', 10);

async function connectMongoWithRetry() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      await connectDB();
      mongoReady = true;
      app.locals.mongoReady = true;
      console.log('MongoDB ready');
      return;
    } catch (err) {
      mongoReady = false;
      app.locals.mongoReady = false;
      console.error('MongoDB unavailable, retrying...', err.message || err);
      await sleep(Number.isNaN(MONGO_RETRY_MS) ? 5000 : MONGO_RETRY_MS);
    }
  }
}

connectMongoWithRetry();

// PORT can come from env as a string; ensure it's numeric for port fallback logic.
let PORT = Number.parseInt(process.env.PORT, 10);
PORT = Number.isNaN(PORT) ? 5000 : PORT;

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`⚠️ Port ${port} occupied, trying ${port + 1}...`);
      startServer(Number(port) + 1);
    } else {
      console.error("Server error:", err);
    }
  });
}

startServer(PORT);
