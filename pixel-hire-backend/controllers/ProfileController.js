const Client = require('../models/Client');
const Creator = require('../models/Creator');
const cloudinary = require('../config/cloudinary');

exports.getProfile = async (req, res) => {
  try {
    const Model = req.user.role === 'client' ? Client : Creator;
    const user = await Model.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile: " + err.message });
  }
};

exports.getProfilebyId = async (req, res) => {
  try {
    // Dynamically determine the model based on the ID
    let user = await Client.findById(req.params.id);
    if (!user) {
      user = await Creator.findById(req.params.id);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile by ID: " + err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const Model = req.user.role === 'client' ? Client : Creator;
    const user = await Model.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.file) {
      cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'PixelHire/profiles' },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: "Image upload failed: " + error.message });
          }
          user.profile_img = result.secure_url;
          Object.assign(user, req.body);
          await user.save();
          res.json(user);
        }
      ).end(req.file.buffer);
    } else {
      Object.assign(user, req.body);
      await user.save();
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile: " + err.message });
  }
};