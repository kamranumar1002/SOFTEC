const express = require('express');
const { selectPaymentMethod, markAsPaid } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/select-method', protect, selectPaymentMethod);
router.post('/mark-paid', protect, markAsPaid);

module.exports = router;
