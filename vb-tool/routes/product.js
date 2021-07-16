const express = require('express');
const router = express.Router();

const {
    create,
    productById,
    read,
    readAll,
    readRelated,
    readCategories,
    readImage,
    readSearchBar,
    readSearch,
    remove,
    update
} = require('../controllers/product');
const {
    requireSignin,
    isAuth,
    isAdmin
} = require('../controllers/auth');
const {
    userById
} = require('../controllers/user');

router.get('/product/:productId', read)
router.get('/products', readAll)
router.get('/products/related/:productId', readRelated)
router.get('/products/categories', readCategories)
router.get('/products/image/:productId', readImage)
router.get("/products/search", readSearchBar);
router.post("/products/by/search", readSearch);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update)
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove)

router.param('userId', userById)
router.param('productId', productById)

module.exports = router;