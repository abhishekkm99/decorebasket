const mongoose = require("mongoose");


const couponSchema = mongoose.Schema({
  couponName: {
    type: String,
    required: true
  },
  couponCode: {
    type: String,
    required: true,
    unique: true
  },

  minPurchase: {
    type: Number,
    default: 500
  },
  couponValue: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
  
  
})
couponSchema.virtual("id").get(function () {
  return this._id.toHexString();
})


couponSchema.set("toJSON", {
  virtuals: true,
})


const CouponItem = mongoose.model("Coupon", couponSchema);


module.exports = CouponItem;