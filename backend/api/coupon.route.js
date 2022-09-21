const express = require('express');
const router = express.Router();
const couponCrtl = require('../controllers/coupon.controller');

router.post("/", couponCrtl.createCoupon)
router.get('/', couponCrtl.getCoupon)
router.delete('/:id',couponCrtl.deleteCoupon)
module.exports = router;