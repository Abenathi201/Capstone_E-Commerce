const { products } = require('../models')

const getProducts = (req, res) => {
    products.getProducts(req, res)
}

const getProduct = (req, res) => {
    products.getProduct(req, res)
}

const addProduct = (req, res) => {
    products.addProduct(req, res)
}

const updateProduct = (req, res) => {
    products.updateProduct(req, res)
}

const deleteProduct = (req, res) => {
    products.deleteProduct(req, res)
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}
