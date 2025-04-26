const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const multer = require('multer');

// Routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const requestRoutes = require('./routes/requestRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const messageRoutes = require('./routes/messageRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const catalogueRoutes = require('./routes/catalogueRoutes');
const creatorRoutes = require('./routes/creatorRoutes');

dotenv.config();
const app = express();
const upload = multer();

// ✅ CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173', // ✅ No trailing slash
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204, // For legacy browser support
};

// ✅ Apply CORS Middleware globally
app.use(cors(corsOptions));

// ✅ No need for this line unless you're manually handling OPTIONS
// app.options('*', cors(corsOptions));

// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ HTTP Server and Socket.IO Setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});
app.set('io', io);

// ✅ Route Middleware
app.use('/api/auth', upload.none(), authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/catalogues', catalogueRoutes);
app.use('/api/creators', creatorRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB Error:', err));

// ✅ Socket.IO Setup
io.on('connection', (socket) => {
  console.log(' A user connected:', socket.id);

  socket.on('sendMessage', (messageData) => {
    io.to(messageData.receiverId).emit('receiveMessage', messageData);
  });

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`👥 User joined room: ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('❌ A user disconnected:', socket.id);
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));