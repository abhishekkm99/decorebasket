const mongoose = require("mongoose");


const orderSchema = mongoose.Schema({
  orderItem: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true
    }
  ],
  shippingAddress: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: "Processing"
  },
  totalPrice: {
    type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  dateOrdered: {
    type: Date,
    default: Date.now
  }
})


orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
})


orderSchema.set("toJSON", {
  virtuals: true,
})


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
