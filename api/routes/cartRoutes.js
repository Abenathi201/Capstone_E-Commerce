const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cartController = require('../controllers/cartController')
const { verifyAToken } = require('../middleware/AuthenticateUsers')
const { verifyOwnership } = require('../middleware/ValidateUser')

// Get user's cart - Must be own cart or admin
router.get('/items/:userID', verifyAToken, verifyOwnership, cartController.getItems)

// Add item to cart - Must be own cart or admin
router.post('/add-items/:userID', bodyParser.json(), verifyAToken, verifyOwnership, cartController.addItem)

// Update cart item - Must be own cart or admin
router.put('/items/:userID/:cartID', bodyParser.json(), verifyAToken, verifyOwnership, cartController.updateItem)

// Delete cart item - Must be own cart or admin
router.delete('/items/:userID/:cartID', verifyAToken, verifyOwnership, cartController.deleteItem)

module.exports = router
