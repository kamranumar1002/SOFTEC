const jwt = require('jsonwebtoken');
const Client = require('../models/Client');
const Creator = require('../models/Creator');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
     console.log(decoded);
     console.log(token);
     
     
      

      const user =
        decoded.role === 'client'
          ? await Client.findById(decoded.id).select('-password')
          : await Creator.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = {
        _id: user._id,
        role: decoded.role,
        email: user.email,
        username: user.username,
      };

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
