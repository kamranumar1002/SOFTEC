const Creator = require('../models/Creator'); // Use the correct model for creators

exports.getAllCreators = async (req, res) => {
  try {
    const creators = await Creator.find(); // Fetch all creators
    console.log(creators);
    
    res.json(creators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCreatorById = async (req, res) => {
  try {
    const { id } = req.params;
    const creator = await Creator.findById(id); // Fetch a specific creator by ID
    console.log(creators);
    if (!creator) {
      return res.status(404).json({ message: 'Creator not found' });
    }
    res.json(creator);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};