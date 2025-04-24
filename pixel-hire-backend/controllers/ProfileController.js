const Client = require('../models/Client');
const Creator = require('../models/Creator');
const cloudinary = require('../config/cloudinary');

exports.getProfile = async (req, res) => {
  try {
    const Model = req.user.role === 'client' ? Client : Creator;
    const user = await Model.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const Model = req.user.role === 'client' ? Client : Creator;
    const user = await Model.findById(req.user._id);

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'PixelHire/profiles' },
        async (error, result) => {
          if (error) return res.status(500).json({ message: error.message });
          user.profile_img = result.secure_url;
          Object.assign(user, req.body);
          await user.save();
          res.json(user);
        }
      );

      result.end(req.file.buffer);
    } else {
      Object.assign(user, req.body);
      await user.save();
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
