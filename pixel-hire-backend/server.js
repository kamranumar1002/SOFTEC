const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http'); // Add this
const { Server } = require('socket.io'); // Add this

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

dotenv.config();
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server); // Initialize Socket.IO
app.set('io', io);
app.use(express.json());

// Route Middleware
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/catalogues', catalogueRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Socket.IO Setup
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for "sendMessage" event
  socket.on('sendMessage', (messageData) => {
    // Broadcast the message to the receiver
    io.to(messageData.receiverId).emit('receiveMessage', messageData);
  });

  // Join a room for private messaging
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));