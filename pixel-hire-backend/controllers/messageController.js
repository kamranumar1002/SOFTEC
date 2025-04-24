const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, receiverRole, content } = req.body;

    const newMessage = new Message({
      sender: {
        id: req.user._id,
        role: req.user.role
      },
      receiver: {
        id: receiverId,
        role: receiverRole
      },
      content
    });

    await newMessage.save();

    // Emit the message to the receiver in real-time
    const io = req.app.get('io'); // Access Socket.IO instance
    io.to(receiverId).emit('receiveMessage', newMessage);

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { "sender.id": req.user._id, "receiver.id": userId },
        { "sender.id": userId, "receiver.id": req.user._id }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
