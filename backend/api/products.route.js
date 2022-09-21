const express = require('express');
const router = express.Router();
const imageUpload = require('../auth/image.middleware.js');
const proCtrl = require('../controllers/product.contoller');

router.get('/', proCtrl.getProducts);
router.get("/search/:search", proCtrl.searchProduct)
router.get('/:id', proCtrl.getProduct);
router.post('/', imageUpload, proCtrl.createProduct);
router.put('/:id', imageUpload, proCtrl.updateProduct);
router.delete('/:id', proCtrl.deleteProduct);
router.get('/get/count', proCtrl.getProductCount);
router.post('/csvupload',proCtrl.multiUpload)
module.exports = router;