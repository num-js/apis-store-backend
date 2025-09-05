const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        maxlength: 200
    },
    images: [{
        type: String,
        required: true
    }],
    price: {
        original: {
            type: Number,
            required: true,
            min: 0
        },
        discounted: {
            type: Number,
            min: 0
        },
        currency: {
            type: String,
            default: 'USD'
        }
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String
    },
    brand: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        unique: true,
        required: true
    },
    ratings: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        totalReviews: {
            type: Number,
            default: 0
        }
    },
    stock: {
        quantity: {
            type: Number,
            required: true,
            min: 0
        },
        reserved: {
            type: Number,
            default: 0,
            min: 0
        },
        available: {
            type: Number,
            default: function() {
                return this.stock.quantity - this.stock.reserved;
            }
        }
    },
    orderedItems: {
        type: Number,
        default: 0,
        min: 0
    },
    specifications: {
        weight: Number,
        dimensions: {
            length: Number,
            width: Number,
            height: Number,
            unit: {
                type: String,
                default: 'cm'
            }
        },
        color: String,
        size: String,
        material: String,
        warranty: String
    },
    tags: [{
        type: String,
        trim: true
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'discontinued', 'out-of-stock'],
        default: 'active'
    },
    featured: {
        type: Boolean,
        default: false
    },
    reviews: [reviewSchema],
    shippingInfo: {
        weight: Number,
        freeShipping: {
            type: Boolean,
            default: false
        },
        shippingCost: {
            type: Number,
            default: 0
        }
    },
    seoInfo: {
        metaTitle: String,
        metaDescription: String,
        keywords: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware to update the updatedAt field
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Index for better search performance
productSchema.index({ title: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, subCategory: 1 });
productSchema.index({ 'price.original': 1 });
productSchema.index({ 'ratings.average': -1 });
productSchema.index({ brand: 1 });
productSchema.index({ status: 1 });

module.exports = mongoose.model('Product', productSchema);
