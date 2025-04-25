const express = require('express');
const { createRequest, getAllOpenRequests } = require('../controllers/requestController');
const { protect } = require('../middlewares/authMiddleware');
const { onlyClients, onlyCreators } = require('../middlewares/roleCheck');
const { deleteRequest } = require('../controllers/requestController');
const { getAllRequests } = require('../controllers/requestController');
const { getRequestsByCreatorAndStatus } = require('../controllers/requestController');




const router = express.Router();

router.post('/', protect, onlyClients, createRequest);
router.get('/', protect, onlyCreators, getAllOpenRequests); // Creators see open jobs
router.delete('/:requestId', protect, onlyClients, deleteRequest);
module.exports = router;
router.get('/', protect, getAllRequests);
router.get('/:creatorId/:status', protect, getRequestsByCreatorAndStatus);