const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { deleteCatalogue } = require('../controllers/CatalogueController');

const {
  createCatalogue,
  getCreatorCatalogues,
  getCatalogueById,
  getCataloguesByCategory,
  getAllCatalogues
} = require('../controllers/CatalogueController');

const { protect } = require('../middlewares/authMiddleware');
const { onlyCreators } = require('../middlewares/roleCheck');

const router = express.Router();

router.post('/', protect, onlyCreators, upload.array('media', 10), createCatalogue);
router.get('/creator/:creatorId', getCreatorCatalogues);
router.get('/id/:catalogueId', getCatalogueById);
// router.get('/category/:categoryId', getCataloguesByCategory);
router.delete('/:catalogueId', protect, onlyCreators, deleteCatalogue);
router.get('/all', getAllCatalogues);

// Update the category route to use category name instead of ID
router.get('/category/:category', getCataloguesByCategory);
module.exports = router;
