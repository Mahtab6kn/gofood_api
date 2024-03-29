const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/foodData')

router.get('/dataList', ctrl.foodData)
router.get('/foodCategory', ctrl.foodCategory)



module.exports = router;