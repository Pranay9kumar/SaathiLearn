const jwt = require('jsonwebtoken');

/**
 * Initialize Socket.io with JWT-authenticated connections.
 * Provides real-time events for mentor requests and XP updates.
 */
const initializeSocket = (io) => {
  // JWT authentication middleware for Socket.io
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;

    if (!token) {
      return next(new Error('Authentication required. Provide a JWT token.'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId;
      next();
    } catch (err) {
      return next(new Error('Invalid or expired token.'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.userId}`);

    // Join a personal room for targeted events
    socket.join(`user:${socket.userId}`);

    // ─── Event Handlers ────────────────────────────────

    // Client can join subject-specific rooms (for mentors)
    socket.on('join:subject', (subject) => {
      socket.join(`subject:${subject}`);
      console.log(`  📚 ${socket.userId} joined subject room: ${subject}`);
    });

    // Heartbeat / ping
    socket.on('ping', (callback) => {
      if (typeof callback === 'function') {
        callback({ status: 'ok', timestamp: Date.now() });
      }
    });

    // Disconnect
    socket.on('disconnect', (reason) => {
      console.log(`🔌 Socket disconnected: ${socket.userId} (${reason})`);
    });

    // Error handling
    socket.on('error', (err) => {
      console.error(`❌ Socket error for ${socket.userId}:`, err.message);
    });
  });

  console.log('🔌 Socket.io initialized with JWT authentication');

  return io;
};

module.exports = { initializeSocket };
