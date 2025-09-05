# 🚀 APIs Store Backend

<div align="center">

**A comprehensive REST API collection providing various data endpoints for frontend development and learning**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[🌐 Live Demo](https://apis-store.web.app/) • [📚 API Documentation](#-api-endpoints) • [🚀 Quick Start](#-quick-start)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [API Endpoints](#-api-endpoints)
  - [Users API](#users-api)
  - [Quotes API](#quotes-api)
  - [Products API](#products-api)
- [Request & Response Examples](#-request--response-examples)
- [Environment Setup](#-environment-setup)
- [Database Schema](#-database-schema)
- [Error Handling](#-error-handling)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**APIs Store Backend** is a comprehensive collection of RESTful APIs designed to help developers, especially beginners, learn and practice API integration in their frontend applications. This project provides real-world data endpoints with proper authentication, validation, and error handling.

### 🎮 Live URLs
- **Frontend (Web App)**: [https://apis-store.web.app/](https://apis-store.web.app/)
- **Backend (API Server)**: [https://apis-store-data.onrender.com](https://apis-store-data.onrender.com)
- **API Base URL**: `https://apis-store-data.onrender.com`

---

## ✨ Features

### 🔥 Core Features
- **Multiple API Collections**: Users, Quotes, and E-commerce Products
- **Complete CRUD Operations**: Create, Read, Update, Delete functionality
- **Advanced Filtering & Search**: Filter by categories, price, ratings, etc.
- **Pagination Support**: Efficient data loading with pagination
- **Real-time Data**: Dynamic content with proper timestamps
- **Error Handling**: Comprehensive error responses with helpful messages
- **Input Validation**: Robust data validation and sanitization
- **Database Indexing**: Optimized queries for better performance

### 🛍️ E-commerce Features
- **Product Management**: Complete product catalog with specifications
- **Inventory Tracking**: Stock management with real-time availability
- **Review System**: User reviews and ratings
- **Category Management**: Organized product categorization
- **Price Management**: Support for discounts and multiple currencies
- **Search & Filters**: Advanced product discovery

### 💬 Content Management
- **Quote Management**: Inspirational quotes with author attribution
- **User Management**: User profiles and data management
- **Dynamic Content**: Easy content updates and management

---

## 🛠 Tech Stack

| Technology | Purpose | Version |
|------------|---------|----------|
| **Node.js** | Runtime Environment | 16+ |
| **Express.js** | Web Framework | ^4.17.1 |
| **MongoDB** | Database | Latest |
| **Mongoose** | ODM | ^5.11.17 |
| **CORS** | Cross-Origin Requests | ^2.8.5 |
| **dotenv** | Environment Variables | ^8.2.0 |
| **body-parser** | Request Parsing | ^1.19.0 |

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/num-js/apis-store-backend.git
   cd apis-store-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your database credentials:
   ```env
   DB_USER=your_mongodb_username
   DB_PASSWORD=your_mongodb_password
   DB_DATABASE=apis-store
   PORT=5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   npm start
   ```

5. **Access the API**
   - Server: `http://localhost:5000`
   - Health Check: `GET http://localhost:5000/`

---

## 📋 API Endpoints

### Base URL: `http://localhost:5000` (Development) | `https://apis-store-data.onrender.com` (Production)

---

## 👥 Users API

### Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/get-users` | Get all users |
| GET | `/users/get-user/:user_id` | Get specific user |
| POST | `/users/add-user` | Add new user |
| PUT | `/users/update-user/:user_id` | Update user |
| DELETE | `/users/delete-user/:user_id` | Delete user |

---

## 💬 Quotes API

### Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/quotes/get-quotes` | Get all quotes |
| GET | `/quotes/get-specific-quote/:quote_id` | Get specific quote |
| POST | `/quotes/add-quote` | Add new quote |
| PUT | `/quotes/update-quote/:quote_id` | Update quote |
| DELETE | `/quotes/delete-quote/:quote_id` | Delete quote |

### Quote Schema
```javascript
{
  "quote": "The only way to do great work is to love what you do.",
  "author": "Steve Jobs",
  "type": "motivational",
  "likes": 150,
  "description": "Inspirational quote about work and passion",
  "createdOn": "2024-01-15T10:30:00Z"
}
```

---

## 🛍️ Products API

### Endpoints

#### Basic CRUD Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products/get-products` | Get all products with filtering & pagination |
| GET | `/products/get-product/:product_id` | Get specific product by ID |
| POST | `/products/add-product` | Add new product |
| PUT | `/products/update-product/:product_id` | Update existing product |
| DELETE | `/products/delete-product/:product_id` | Delete product |

#### Advanced Operations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products/category/:category` | Get products by category |
| GET | `/products/featured` | Get featured products |
| POST | `/products/add-review/:product_id` | Add review to product |
| PUT | `/products/update-stock/:product_id` | Update stock quantity |

### Query Parameters for Products

#### Filtering
- `category` - Filter by category (e.g., "Electronics")
- `subCategory` - Filter by subcategory
- `brand` - Filter by brand name
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `minRating` - Minimum rating filter
- `status` - Product status (active, inactive, discontinued, out-of-stock)
- `featured` - Featured products (true/false)

#### Search & Sorting
- `search` - Full-text search across title, description, tags
- `sortBy` - Sort field (createdAt, price.original, ratings.average)
- `sortOrder` - Sort direction (asc, desc)

#### Pagination
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

### Product Schema
```javascript
{
  "title": "iPhone 15 Pro Max",
  "description": "The most advanced iPhone ever...",
  "shortDescription": "Latest iPhone with titanium design",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "price": {
    "original": 1199.99,
    "discounted": 1099.99,
    "currency": "USD"
  },
  "category": "Electronics",
  "subCategory": "Smartphones",
  "brand": "Apple",
  "sku": "APL-IPH15PM-256-TIT",
  "ratings": {
    "average": 4.5,
    "totalReviews": 128
  },
  "stock": {
    "quantity": 50,
    "reserved": 5,
    "available": 45
  },
  "orderedItems": 25,
  "specifications": {
    "weight": 221,
    "dimensions": {
      "length": 15.9,
      "width": 7.6,
      "height": 0.83,
      "unit": "cm"
    },
    "color": "Natural Titanium",
    "size": "6.7 inch",
    "material": "Titanium",
    "warranty": "1 Year Limited Warranty"
  },
  "tags": ["smartphone", "apple", "5g", "titanium", "pro"],
  "status": "active",
  "featured": true,
  "reviews": [
    {
      "userId": "user123",
      "userName": "John Doe",
      "rating": 5,
      "comment": "Amazing phone with great camera!",
      "date": "2024-01-15T10:30:00Z"
    }
  ],
  "shippingInfo": {
    "weight": 0.5,
    "freeShipping": true,
    "shippingCost": 0
  },
  "seoInfo": {
    "metaTitle": "iPhone 15 Pro Max - Buy Latest Apple Smartphone",
    "metaDescription": "Get the iPhone 15 Pro Max with A17 Pro chip...",
    "keywords": ["iphone 15", "apple smartphone", "titanium phone"]
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

## 🔍 Request & Response Examples

### Get All Products with Filters

**Request:**
```http
GET /products/get-products?category=Electronics&minPrice=100&maxPrice=2000&page=1&limit=5&sortBy=price.original&sortOrder=asc
```

**Response:**
```json
{
  "message": "Products fetched successfully",
  "data": [
    {
      "_id": "60d5ecb74d2a6c001f5e4e1a",
      "title": "Sony WH-1000XM5 Wireless Headphones",
      "price": {
        "original": 399.99,
        "discounted": 349.99,
        "currency": "USD"
      },
      "category": "Electronics",
      "brand": "Sony",
      "ratings": {
        "average": 4.5,
        "totalReviews": 89
      },
      "stock": {
        "available": 75
      },
      "featured": false
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalProducts": 15,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Add New Product

**Request:**
```http
POST /products/add-product
Content-Type: application/json

{
  "title": "Samsung Galaxy Watch 6",
  "description": "Advanced smartwatch with health monitoring",
  "images": ["https://example.com/watch.jpg"],
  "price": {
    "original": 329.99,
    "currency": "USD"
  },
  "category": "Electronics",
  "subCategory": "Wearables",
  "brand": "Samsung",
  "sku": "SAM-GW6-44-BLK",
  "stock": {
    "quantity": 30
  },
  "specifications": {
    "color": "Black",
    "size": "44mm"
  }
}
```

**Response:**
```json
{
  "message": "Product added successfully",
  "data": {
    "_id": "60d5ecb74d2a6c001f5e4e1b",
    "title": "Samsung Galaxy Watch 6",
    "price": {
      "original": 329.99,
      "currency": "USD"
    },
    "stock": {
      "quantity": 30,
      "available": 30
    },
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Add Product Review

**Request:**
```http
POST /products/add-review/60d5ecb74d2a6c001f5e4e1a
Content-Type: application/json

{
  "userId": "user123",
  "userName": "John Smith",
  "rating": 5,
  "comment": "Excellent sound quality and noise cancellation!"
}
```

### Search Products

**Request:**
```http
GET /products/get-products?search=smartphone&minRating=4&featured=true
```

### Get Products by Category

**Request:**
```http
GET /products/category/Electronics?page=1&limit=10&sortBy=ratings.average&sortOrder=desc
```

### Get Featured Products

**Request:**
```http
GET /products/featured?limit=5
```

---

## 🔧 Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_DATABASE=apis-store

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: JWT Secret (for future authentication)
# JWT_SECRET=your_jwt_secret_key
```

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Add your connection details to `.env`

---

## 📊 Database Schema

### Collections

1. **users** - User management and profiles
2. **quotes** - Inspirational quotes and sayings
3. **products** - E-commerce product catalog

### Indexes

For optimal performance, the following indexes are created:

**Products Collection:**
- Text index on `title`, `description`, `tags`
- Compound index on `category`, `subCategory`
- Index on `price.original`
- Index on `ratings.average` (descending)
- Index on `brand`
- Index on `status`

---

## ⚠️ Error Handling

### Standard Error Response Format

```json
{
  "message": "Error description",
  "error": "Detailed error information",
  "status": 400
}
```

### HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad Request / Validation Error |
| 404 | Resource not found |
| 500 | Internal Server Error |

### Common Error Scenarios

- **Invalid ObjectId**: `400 - Invalid product ID format`
- **Duplicate SKU**: `400 - Product with this SKU already exists`
- **Validation Error**: `400 - Validation error with details`
- **Not Found**: `404 - Product not found`
- **Insufficient Stock**: `400 - Insufficient stock available`

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation for API changes
- Ensure all tests pass before submitting PR

---

## 📝 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Numan Ahmed**
- GitHub: [@num-js](https://github.com/num-js)
- Email: [mdnmnahmed@gmail.com](mailto:mdnmnahmed@gmail.com)

---

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this project
- Inspired by the need to provide practical API learning resources
- Built with ❤️ for the developer community

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

[Report Bug](https://github.com/num-js/apis-store-backend/issues) • [Request Feature](https://github.com/num-js/apis-store-backend/issues) • [Documentation](https://apis-store.web.app/)

</div>
