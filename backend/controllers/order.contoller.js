const Order = require("../models/order.entity");
const OrderItem = require("../models/order.item.entity");


exports.getOrders = async (req, res) => {
    const orderList = await Order.find()
      .populate("user", "name")
      .populate({ path: "orderItem", populate: "product" }).sort({ dateOrdered: -1 });
    if (!orderList) res.status(500).json({ success: false });
    res.send(orderList);
  }


  exports.getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate({ path: "orderItem", populate: "product" });
    if (!order) res.status(500).json({ success: false });
    res.send(order);
  }


  exports.createOrder = async (req, res) => {
    const orderItemsIds = Promise.all(
      req.body.orderItem.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        })
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      }))
    const resolvedId = await orderItemsIds;
    const totalPrices = await Promise.all(
      resolvedId.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate("product", "price");
        const totalPrice = orderItem.product.price * orderItem.quantity;
        
        return totalPrice;
      }))
    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
    let order = new Order({
      orderItem: resolvedId,
      shippingAddress: req.body.shippingAddress,
      city: req.body.city,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: totalPrice,
      user: req.body.user,
    })
    order = await order.save();
    if (!order) return res.status(400).send("cannot create order");
    res.send(order);
  }


  exports.updateOrder = async (req, res) => {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      { new: true }
    )
    if (!order) return res.status(400).send("cannot update order");
    res.send(order);
  }


  exports.deleteOrder = (req, res) => {
    Order.findByIdAndRemove(req.params.id)
      .then(async (order) => {
        if (order) {
          await order.orderItem.map(async (orderItem) => {
            await OrderItem.findByIdAndRemove(orderItem);
          })
          return res
            .status(200)
            .json({ success: true, message: "the order is deleted" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "order not found" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ success: false, error: err });
      })
  }


  exports.getTotalSale = async (req, res) => {
    const order = await Order.find();
    if (!order) {
      return res.status(200).json({ totalsales: 0 });
    }
    const totalsales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
    ])
    if (!totalsales) {
      return res.send({ totalsales: 0 });
    } else {
      return res.send({ totalsales: totalsales });
    }
  }


  exports.getOrderCount = async (req, res) => {
    const orderCount = await Order.countDocuments();
    if (!orderCount) {
      return res.status(500).json({ success: false });
    }
    res.send({ orderCount: orderCount });
  }


  exports.getUserOrder = async (req, res) => {
    const userOrderList = await Order.find({ user: req.params.userid })
      .populate({
        path: "orderItem",
        populate: "product"
      })
      .sort({ dateOrdered: -1 });
  
    if (!userOrderList) {
      return res.status(500).json({ success: false });
    }
    res.send(userOrderList);
  }

  