const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const productController = require('../controllers/productController')
const { verifyAToken, isAdmin } = require('../middleware/AuthenticateUsers')

// Public routes - no auth required
router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getProduct)

// Admin only routes
router.post('/product-add', bodyParser.json(), verifyAToken, isAdmin, productController.addProduct)
router.put('/products/:id', bodyParser.json(), verifyAToken, isAdmin, productController.updateProduct)
router.delete('/products/:id', verifyAToken, isAdmin, productController.deleteProduct)

module.exports = router
