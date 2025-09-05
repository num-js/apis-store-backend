const express = require('express');
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct, getProductsByCategory, getFeaturedProducts, addProductReview, updateStock } = require('../controllers/productsController');
const router = express.Router();

// Basic CRUD operations
router.get('/get-products', getProducts);
router.get('/get-product/:product_id', getProduct);
router.post('/add-product', addProduct);
router.put('/update-product/:product_id', updateProduct);
router.delete('/delete-product/:product_id', deleteProduct);

// Additional functionality routes
router.get('/category/:category', getProductsByCategory);
router.get('/featured', getFeaturedProducts);
router.post('/add-review/:product_id', addProductReview);
router.put('/update-stock/:product_id', updateStock);

module.exports = router;
