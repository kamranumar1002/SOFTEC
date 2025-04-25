const express = require('express');
const { getAllCreators, getCreatorById } = require('../controllers/creatorController');
const router = express.Router();

router.get('/', getAllCreators); // Get all creators
router.get('/:id', getCreatorById); // Get a specific creator by ID

module.exports = router;