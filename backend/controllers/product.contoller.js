const Product = require('../models/product.entity');
const mongoose = require("mongoose");
const csvtojson = require('csvtojson')


exports.getProducts = async (req, res) => {
    const product = await Product.find();
    if (!product) return res.status(500).send('cannot get product');
    res.status(200).send(product);
}

exports.searchProduct = async (req,res) => {
    const{search}= req.params
    if(!search){
        const product = await Product.find();
        if (!product) return res.status(500).send('cannot get product');
        res.status(200).send(product);
    }
    else{
        const product = await Product.find({name : {$regex : new RegExp("^" + search, "i")}})
        res.status(200).send(product)
    }
}

exports.getProduct = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid product id');
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(500).send('cannot get product');
    res.status(200).send(product);
}


exports.createProduct = (req, res) => {
    if (!req.file) return res.status(400).send('image not found');
    const url = req.protocol + "://" + req.get("host");
    imagePath =  url+ "/images/" + req.file.filename;
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: imagePath,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock
    })
    product.save().then(() => {
        res.status(200).send(product);
    }).catch(() => {
        res.status(500).send('cannot add product');
    })
}


exports.updateProduct = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid product id');
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send('invalid product');
    let imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    else {
        imagePath = product.image;
    }
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            image: imagePath,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock
        },
        { new: true }
    )
    if (!updatedProduct) return res.status(500).send('cannot update product');
    res.status(200).send(updatedProduct);
}


exports.deleteProduct = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('invalid product id');
    }
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) res.status(500).send('cannot delete product');
    res.status(200).send(product);
}


exports.getProductCount = async (req, res) => {
    const productCount = await Product.countDocuments();
    if (!productCount) {
        return res.status(500).json({ success: false });
    }
    res.send({ productCount: productCount });
}

exports.multiUpload = async(req,res)=>{
    csvtojson()
    .fromFile("productsdata.csv")
    .then(csvData=>{
        Product.insertMany(csvData).then(function (){
            res.json({message:csvData})
        })
        .catch(function(error){
            console.log(error)
        })
    })
}