const express = require('express');
const { confirmBooking, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');
const { onlyClients } = require('../middlewares/roleCheck');

const router = express.Router();

router.post('/confirm', protect, onlyClients, confirmBooking);
router.get('/my', protect, getMyBookings); // both roles

module.exports = router;
