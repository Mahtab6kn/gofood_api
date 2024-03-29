const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/order')

router.post('/orderData', orderCtrl.orderData);
router.post('/myOrder', orderCtrl.myOrder)



module.exports = router;