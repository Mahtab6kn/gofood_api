const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signupData);
router.post('/login', userCtrl.loginData);
router.post('/forgot-password', userCtrl.forgotPassword);
router.post('/reset-password/:token', userCtrl.resetPassword);


module.exports = router; 