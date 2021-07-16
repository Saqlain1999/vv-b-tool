const _ = require('lodash');
const formidable = require('formidable');
const fs = require('fs');
const Product = require('../models/product');
const {
    errorHandler
} = require('../helpers/dbErrorHandler');

exports.productById = (req, res, next, id) => {
    Product.findById(id)
    .populate('category')
    .exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({
                error: 'Product not found'
            })
        }
        req.product = product;
        next();
    });
}

exports.read = (req, res) => {
    req.product.image = undefined;
    return res.json(req.product);
}

exports.readAll = (req, res) => {
    let orderBy = req.query.orderBy ? req.query.orderBy : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limitBy = req.query.limitBy ? parseInt(req.query.limitBy) : 8

    Product.find()
        .select("-image")
        .populate('category')
        .sort([
            [sortBy, orderBy]
        ])
        .limit(limitBy)
        .exec((err, products) => {
            if (err || !products) {
                return res.status(400).json({
                    error: 'No Products Found'
                })
            }
            res.json(products)
        })
}

exports.readRelated = (req, res) => {
    let limitBy =  req.query.limitBy ? parseInt(req.query.limitBy) : 8;

    Product.find({ _id: { $ne: req.product }, category:  req.product.category })
    .limit(limitBy)
    .populate('category','_id name')
    .exec((err, products)=> {
        if (err || !products) {
            return res.status(400).json({
                error: 'No Related Products Found'
            })
        }
        res.json(products)
    });
};

exports.readCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'No Category Found'
            })
        }
        res.json(category)
    })
}

exports.readImage = (req,res,next) => {
    if(req.product.image.data) {
        res.set('Content-Type', req.product.image.contentType)
        return res.send(req.product.image.data); 
    }
    next();
}

exports.readSearch = (req, res) => {
    let orderBy = req.body.orderBy ? req.body.orderBy : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limitBy = req.body.limitBy ? parseInt(req.body.limitBy) : 50;
    let skipBy = parseInt(req.body.skipBy);
    let searchArguments = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                searchArguments[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                searchArguments[key] = req.body.filters[key];
            }
        }
    }

    Product.find(searchArguments)
        .select("-image")
        .populate("category")
        .sort([[sortBy, orderBy]])
        .skip(skipBy)
        .limit(limitBy)
        .exec((err, product_data) => {
            if (err) {
                return res.status(400).json({
                    error: "No Products found"
                });
            }
            res.json({
                product_amount: product_data.length,
                product_data
            });
        });
};

exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, success) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            "message": "The Product has been successfully removed"
        })
    });
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image can not be uploaded'
            })
        }

        const {name, description, price, category, quantity} = fields

        if(!name || !description || !price || !category || !quantity) {
            return res.status(400).json({
                error: "All fields are required!"
            })
        }

        let product = new Product(fields)
        if (files.image) {
            product.image.data = fs.readFileSync(files.image.path)
            product.image.contentType = files.image.contentType
        }
        product.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(success);
        })
    });
}
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image can not be uploaded'
            })
        }
        let product = req.product
        product = _.extend(product, fields)
        if (files.image) {
            product.image.data = fs.readFileSync(files.image.path)
            product.image.contentType = files.image.contentType
        }
        product.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(success);
        })
    });
}

exports.readSearchBar = (req,res) => {
    const query = {}
    if (req.query.search){
        query.name = {$regex: req.query.search, $options: 'i'}
        if(req.query.category && req.query.category != 'All'){
            query.category = req.query.category
        }
        Product.find(query, (err, products) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(products)
        }).select('-image')
    }
}