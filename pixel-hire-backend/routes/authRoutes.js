const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();
const { refreshToken } = require('../controllers/authController');


router.post('/signup', signup);
router.post('/login', login);
router.post('/refreshToken', refreshToken);

module.exports = router;
