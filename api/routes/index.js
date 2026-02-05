const express = require('express')
const router = express.Router()

const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const cartRoutes = require('./cartRoutes')

// Mount routes
router.use(userRoutes)
router.use(productRoutes)
router.use(cartRoutes)

module.exports = router
