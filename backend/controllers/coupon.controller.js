const CouponItem = require("../models/coupon.entity");
const mongoose = require("mongoose");


exports.createCoupon = async (req, res) => {
    const{couponName, couponCode, couponValue, minPurchase, active} = req.body;
    if(!couponName || !couponCode || !couponValue){
        return res.status(404).send('field missing')
    }
    const newCoupon = await CouponItem.create({couponName, couponCode,couponValue, minPurchase, active})
    return res.status(200).send(newCoupon)
}

// exports.changeStatus = async (req, res) => {
//     const{couponId, status}= req.body
//     console.log(req.body);
//     if(!couponId || !status){
//         return res.status(404).send('field missing')
//     }
//     const updatedCoupon = await CouponItem.findOneAndUpdate({_id: couponId}, {status}, {new: true})
//     return res.status(200).send(updatedCoupon)
// }

// exports.getDiscount = async (req,res) => {
//     const{couponCode} = req.params
//     if(!couponCode){
//         return res.status(404).send('field missing')
//     }
//     const coupon = await CouponItem.findOne({couponCode, status: true})
//     if(!coupon){
//         return res.status(404).send('invalid coupon')
//     }
//     return res.status(200).send(coupon)

// }
exports.deleteCoupon = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid coupon id');
    }
    const coupon = await CouponItem.findByIdAndRemove(req.params.id);
    if (!coupon) res.status(500).send('cannot delete coupon');
    res.status(200).send(coupon);
}

exports.getCoupon = async (req,res) => {
    const coupon = await CouponItem.find()
    return res.status(200).send(coupon)

}