const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const userController = require('../controllers/userController')
const { verifyAToken, isAdmin } = require('../middleware/AuthenticateUsers')
const { verifyOwnership, validatePasswordMiddleware } = require('../middleware/ValidateUser')
const { loginLimiter, registerLimiter } = require('../middleware/RateLimiter')

// Get all users - Admin only
router.get('/users', verifyAToken, isAdmin, userController.getUsers)

// Get single user - Must be own profile or admin
router.get('/users/:id', verifyAToken, verifyOwnership, userController.getUser)

// Register - Rate limited + password validation
router.post('/register', registerLimiter, bodyParser.json(), validatePasswordMiddleware, userController.register)

// Login - Rate limited to prevent brute force
router.post('/login', loginLimiter, bodyParser.json(), userController.login)

// Update user - Must be own profile or admin + password validation
router.put('/users/:id', bodyParser.json(), verifyAToken, verifyOwnership, validatePasswordMiddleware, userController.updateUser)

// Delete user - Admin only
router.delete('/users/:id', verifyAToken, isAdmin, userController.deleteUser)

module.exports = router
