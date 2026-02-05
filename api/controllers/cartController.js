const { cart } = require('../models')

const getItems = (req, res) => {
    const userID = req.params.userID
    if (!userID) {
        return res.status(400).json({ message: 'userID is required' })
    }
    cart.getItems(req, res, userID)
}

const addItem = (req, res) => {
    const userID = req.params.userID
    const { productID, quantity } = req.body
    cart.addItem(req, res, userID, productID, quantity)
}

const updateItem = (req, res) => {
    const userID = req.params.userID
    const cartID = req.params.cartID
    const { quantity } = req.body
    cart.updateItem(req, res, userID, cartID, quantity)
}

const deleteItem = (req, res) => {
    const userID = req.params.userID
    const cartID = req.params.cartID
    cart.deleteItem(req, res, userID, cartID)
}

module.exports = {
    getItems,
    addItem,
    updateItem,
    deleteItem
}
