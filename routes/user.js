const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signupData);
router.post('/login', userCtrl.loginData);


module.exports = router;