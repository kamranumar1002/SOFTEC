const Client = require('../models/Client');
const Creator = require('../models/Creator');
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { role, ...rest } = req.body;

  try {
    let user;

    if (role === 'client') {
      user = new Client(rest);
    } else if (role === 'creator') {
      user = new Creator(rest);
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    await user.save();

    const token = generateToken(user._id, role);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const Model = role === 'client' ? Client : Creator;
    const user = await Model.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, role);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Token is required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });

      const newToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
      res.json({ token: newToken });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};