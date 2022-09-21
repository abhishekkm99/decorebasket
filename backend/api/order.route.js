const express = require("express");
const router = express.Router();
const orderCtrl = require('../controllers/order.contoller');

router.get("/", orderCtrl.getOrders);
router.get("/:id", orderCtrl.getOrder);
router.post("/", orderCtrl.createOrder);
router.put("/:id", orderCtrl.updateOrder);
router.delete("/:id", orderCtrl.deleteOrder);
router.get("/get/totalsales", orderCtrl.getTotalSale);
router.get("/get/count", orderCtrl.getOrderCount);
router.get("/get/userorders/:userid", orderCtrl.getUserOrder);

module.exports = router;
