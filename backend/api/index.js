const router =  require('express').Router();

router.use('/users',require('./users.route'))
router.use('/products',require('./products.route'))
router.use('/orders',require('./order.route'))
router.use('/coupon', require('./coupon.route'))

module.exports = router