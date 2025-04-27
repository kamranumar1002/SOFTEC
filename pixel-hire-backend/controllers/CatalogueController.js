const Catalogue = require('../models/Catalogue');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const uploadMedia = (fileBuffer, mimetype) =>
  new Promise((resolve, reject) => {
    const type = mimetype.startsWith('video') ? 'video' : 'image';
    const folder = type === 'video' ? 'PixelHire/videos' : 'PixelHire/images';

    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: type },
      (err, result) => {
        if (err) return reject(err);
        resolve({ url: result.secure_url, type });
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });

exports.createCatalogue = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const media = [];

    if (req.files) {
      for (const file of req.files) {
        const uploaded = await uploadMedia(file.buffer, file.mimetype);
        media.push(uploaded);
      }
    }

    const newCatalogue = new Catalogue({
      creator: req.user._id,
      title,
      description,
      category,
      media
    });

    await newCatalogue.save();
    res.status(201).json(newCatalogue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCreatorCatalogues = async (req, res) => {
  try {
    const { creatorId } = req.params;
    const catalogues = await Catalogue.find({ creator: creatorId }).populate('category');
    res.json(catalogues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCatalogueById = async (req, res) => {
  try {
    const { catalogueId } = req.params;
    const catalogue = await Catalogue.findById(catalogueId).populate('category');
    if (!catalogue) return res.status(404).json({ message: 'Catalogue not found' });
    res.json(catalogue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCatalogue = async (req, res) => {
  try {
    const { catalogueId } = req.params;

    const catalogue = await Catalogue.findById(catalogueId);
    if (!catalogue) return res.status(404).json({ message: 'Catalogue not found' });

    if (catalogue.creator.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Not authorized to delete this catalogue' });
    }

    await catalogue.remove();
    res.json({ message: 'Catalogue deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Add this new method to get all catalogs
exports.getAllCatalogues = async (req, res) => {
  try {
    const catalogues = await Catalogue.find()
      .populate('creator')
      .populate('category')
      .sort({ createdAt: -1 });
    
    res.json(catalogues.map(catalog => ({
      _id: catalog._id,
      title: catalog.title,
      description: catalog.description,
      category: catalog.category.name,
      creator: {
        _id: catalog.creator._id,
        name: `${catalog.creator.fname} ${catalog.creator.lname}`,
        profile_img: catalog.creator.profile_img
      },
      media: catalog.media,
      createdAt: catalog.createdAt
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update the existing getCataloguesByCategory method
exports.getCataloguesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const catalogues = await Catalogue.find()
      .populate('creator')
      .populate({
        path: 'category',
        match: { name: category }
      })
      .sort({ createdAt: -1 });

    const filteredCatalogues = catalogues.filter(cat => cat.category !== null);
    
    res.json(filteredCatalogues.map(catalog => ({
      _id: catalog._id,
      title: catalog.title,
      description: catalog.description,
      category: catalog.category.name,
      creator: {
        _id: catalog.creator._id,
        name: `${catalog.creator.fname} ${catalog.creator.lname}`,
        profile_img: catalog.creator.profile_img
      },
      media: catalog.media,
      createdAt: catalog.createdAt
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};