require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Server } = require('socket.io');

const errorHandler = require('./middleware/errorHandler');
const { initializeSocket } = require('./sockets');

// ─── Route Imports ──────────────────────────────────────
const authRoutes = require('./routes/auth.routes');
const missionRoutes = require('./routes/mission.routes');
const studentRoutes = require('./routes/student.routes');
const aiRoutes = require('./routes/ai.routes');
const mentorRoutes = require('./routes/mentor.routes');
const ngoRoutes = require('./routes/ngo.routes');
const syncRoutes = require('./routes/sync.routes');

// ─── App Setup ──────────────────────────────────────────
const app = express();
const server = http.createServer(app);

// ─── CORS Configuration ────────────────────────────────
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);

// ─── Socket.io Setup ───────────────────────────────────
const io = new Server(server, {
  cors: {
    origin: corsOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

initializeSocket(io);
app.set('io', io); // Make io available in controllers via req.app.get('io')

// ─── Middleware ─────────────────────────────────────────
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' })); // Support larger payloads for offline sync
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ───────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SaathiLearn API is running 🚀',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ─── API Routes ─────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/mission', missionRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/mentor', mentorRoutes);
app.use('/api/ngo', ngoRoutes);
app.use('/api/sync', syncRoutes);

// ─── 404 Handler ────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  });
});

// ─── Error Handler ──────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ───────────────────────────────────────
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════════╗');
  console.log('  ║                                          ║');
  console.log(`  ║   🎓 SaathiLearn API — Port ${PORT}          ║`);
  console.log(`  ║   📡 Environment: ${(process.env.NODE_ENV || 'development').padEnd(20)}║`);
  console.log('  ║   🔌 Socket.io: Ready                    ║');
  console.log('  ║                                          ║');
  console.log('  ╚══════════════════════════════════════════╝');
  console.log('');
  console.log('  API Routes:');
  console.log('  ├── POST   /api/auth/signup');
  console.log('  ├── POST   /api/auth/login');
  console.log('  ├── GET    /api/auth/me');
  console.log('  ├── GET    /api/mission/today');
  console.log('  ├── POST   /api/mission/submit');
  console.log('  ├── GET    /api/mission/:id');
  console.log('  ├── GET    /api/student/profile');
  console.log('  ├── GET    /api/student/progress');
  console.log('  ├── GET    /api/student/streak');
  console.log('  ├── GET    /api/student/leaderboard');
  console.log('  ├── POST   /api/ai/hint');
  console.log('  ├── POST   /api/mentor/request');
  console.log('  ├── GET    /api/mentor/students');
  console.log('  ├── GET    /api/mentor/requests');
  console.log('  ├── POST   /api/mentor/reply');
  console.log('  ├── GET    /api/ngo/metrics');
  console.log('  ├── GET    /api/ngo/at-risk');
  console.log('  ├── GET    /api/ngo/overview');
  console.log('  └── POST   /api/sync');
  console.log('');
  console.log(`  Health: http://localhost:${PORT}/api/health`);
  console.log('');
});

// ─── Graceful Shutdown ──────────────────────────────────
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed.');
    process.exit(0);
  });
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = { app, server };
