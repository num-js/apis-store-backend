const Product = require('../models/productsModel');

/**
 * Get all products with filtering, pagination, and search
 * @param {object} req 
 * @param {object} res 
 */
const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, subCategory, brand, minPrice, maxPrice, minRating, status = 'active', featured, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

        // Build filter object
        const filter = { status };

        if (category) filter.category = new RegExp(category, 'i');
        if (subCategory) filter.subCategory = new RegExp(subCategory, 'i');
        if (brand) filter.brand = new RegExp(brand, 'i');
        if (minPrice || maxPrice) {
            filter['price.original'] = {};
            if (minPrice) filter['price.original'].$gte = Number(minPrice);
            if (maxPrice) filter['price.original'].$lte = Number(maxPrice);
        }
        if (minRating) filter['ratings.average'] = { $gte: Number(minRating) };
        if (featured !== undefined) filter.featured = featured === 'true';

        // Search functionality
        if (search) {
            filter.$text = { $search: search };
        }

        // Sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Execute query with pagination
        const skip = (page - 1) * limit;
        const products = await Product.find(filter)
            .sort(sort)
            .limit(Number(limit))
            .skip(skip)
            .select('-reviews'); // Exclude reviews for list view

        const total = await Product.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);

        if (products.length > 0) {
            res.status(200).json({
                message: 'Products fetched successfully',
                data: products,
                pagination: {
                    currentPage: Number(page),
                    totalPages,
                    totalProducts: total,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            });
        } else {
            res.status(404).json({
                message: 'No products found',
                data: [],
                pagination: {
                    currentPage: Number(page),
                    totalPages: 0,
                    totalProducts: 0,
                    hasNextPage: false,
                    hasPrevPage: false
                }
            });
        }
    } catch (err) {
        res.status(500).json({ 
            message: 'Error fetching products', 
            error: err.message 
        });
    }
};

/**
 * Get a specific product by ID
 * @param {object} req 
 * @param {object} res 
 */
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.product_id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            message: 'Product fetched successfully',
            data: product
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        res.status(500).json({ 
            message: 'Error fetching product', 
            error: err.message 
        });
    }
};

/**
 * Add a new product
 * @param {object} req 
 * @param {object} res 
 */
const addProduct = async (req, res) => {
    try {
        // Calculate available stock
        if (req.body.stock) {
            req.body.stock.available = req.body.stock.quantity - (req.body.stock.reserved || 0);
        }

        const newProduct = new Product(req.body);
        await newProduct.save();
        
        res.status(201).json({
            message: 'Product added successfully',
            data: newProduct
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ 
                message: 'Product with this SKU already exists' 
            });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                message: 'Validation error', 
                details: err.message 
            });
        }
        res.status(500).json({ 
            message: 'Error adding product', 
            error: err.message 
        });
    }
};

/**
 * Update a product
 * @param {object} req 
 * @param {object} res 
 */
const updateProduct = async (req, res) => {
    try {
        // Calculate available stock if stock is being updated
        if (req.body.stock) {
            req.body.stock.available = req.body.stock.quantity - (req.body.stock.reserved || 0);
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.product_id,
            { ...req.body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                message: 'Validation error', 
                details: err.message 
            });
        }
        res.status(500).json({ 
            message: 'Error updating product', 
            error: err.message 
        });
    }
};

/**
 * Delete a product
 * @param {object} req 
 * @param {object} res 
 */
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.product_id);
        
        if (!deletedProduct) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json({
            message: 'Product deleted successfully',
            data: deletedProduct
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        res.status(500).json({ 
            message: 'Error deleting product', 
            error: err.message 
        });
    }
};

/**
 * Get products by category
 * @param {object} req 
 * @param {object} res 
 */
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

        const filter = { 
            category: new RegExp(category, 'i'),
            status: 'active'
        };

        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const skip = (page - 1) * limit;
        const products = await Product.find(filter)
            .sort(sort)
            .limit(Number(limit))
            .skip(skip)
            .select('-reviews');

        const total = await Product.countDocuments(filter);

        res.status(200).json({
            message: `Products in ${category} category fetched successfully`,
            data: products,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
                totalProducts: total
            }
        });
    } catch (err) {
        res.status(500).json({ 
            message: 'Error fetching products by category', 
            error: err.message 
        });
    }
};

/**
 * Get featured products
 * @param {object} req 
 * @param {object} res 
 */
const getFeaturedProducts = async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        
        const products = await Product.find({ 
            featured: true, 
            status: 'active' 
        })
        .sort({ 'ratings.average': -1, createdAt: -1 })
        .limit(Number(limit))
        .select('-reviews');

        res.status(200).json({
            message: 'Featured products fetched successfully',
            data: products
        });
    } catch (err) {
        res.status(500).json({ 
            message: 'Error fetching featured products', 
            error: err.message 
        });
    }
};

/**
 * Add a review to a product
 * @param {object} req 
 * @param {object} res 
 */
const addProductReview = async (req, res) => {
    try {
        const product = await Product.findById(req.params.product_id);
        
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Check if user already reviewed this product
        const existingReview = product.reviews.find(
            review => review.userId === req.body.userId
        );

        if (existingReview) {
            return res.status(400).json({
                message: 'User has already reviewed this product'
            });
        }

        // Add new review
        product.reviews.push(req.body);

        // Update average rating and total reviews
        const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
        product.ratings.average = totalRating / product.reviews.length;
        product.ratings.totalReviews = product.reviews.length;

        await product.save();

        res.status(201).json({
            message: 'Review added successfully',
            data: product
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        res.status(500).json({ 
            message: 'Error adding review', 
            error: err.message 
        });
    }
};

/**
 * Update stock quantity when an order is placed
 * @param {object} req 
 * @param {object} res 
 */
const updateStock = async (req, res) => {
    try {
        const { quantity } = req.body;
        const product = await Product.findById(req.params.product_id);
        
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        if (product.stock.available < quantity) {
            return res.status(400).json({
                message: 'Insufficient stock available'
            });
        }

        // Update stock and ordered items
        product.stock.quantity -= quantity;
        product.stock.available = product.stock.quantity - product.stock.reserved;
        product.orderedItems += quantity;

        // Update status if out of stock
        if (product.stock.available <= 0) {
            product.status = 'out-of-stock';
        }

        await product.save();

        res.status(200).json({
            message: 'Stock updated successfully',
            data: product
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        res.status(500).json({ 
            message: 'Error updating stock', 
            error: err.message 
        });
    }
};

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getFeaturedProducts,
    addProductReview,
    updateStock
};
