const express = require('express')
const routes = express.Router()
const bodyParser = require('body-parser')
const { users, products, cart } = require('../models')

/*========== Users Routes ==========*/

routes.get('/users', (req, res) => {
    users.getUsers(req, res)
});

routes.get('/users/:id', (req, res) => {
    users.getUser(req, res)
});

routes.post('/register', bodyParser.json(), (req, res) => {
    users.register(req, res)
});

routes.post('/login', bodyParser.json(), (req, res) => {
    users.login(req, res)
});

routes.put('/users/:id', bodyParser.json(), (req, res) => {
    users.updateUser(req, res)
});

routes.delete('/users/:id', bodyParser.json(), (req, res) => {
    users.deleteUser(req, res)
});

/*========== Users Routes ==========*/

/*========== Users Routes ==========*/
routes.get('/products', (req, res) => {
    products.getProducts(req, res)
});

routes.get('/products/:id', (req, res) => {
    products.getProduct(req, res)
});

routes.post('/product-add', bodyParser.json(), (req, res) => {
    products.addProduct(req, res)
});

routes.put('/products/:id', bodyParser.json(), (req, res) => {
    products.updateProduct(req, res)
});

routes.delete('/products/:id', (req, res) => {
    products.deleteProduct(req, res)
});
/*========== Users Routes ==========*/

/*========== Cart Routes ==========*/
routes.get('/items', (req, res) => {
    cart.getItems(req, res);
});

routes.post('/add-item', bodyParser.json(), (req, res) => {
    cart.addItem(req, res);
});

routes.put('/items/:id', bodyParser.json(), (req, res) => {
    cart.updateItem(req, res);
});

routes.delete('/items/:id', (req, res) => {
    cart.deleteItem(req, res);
    
});
/*========== Cart Routes ==========*/

module.exports = {
    express,
    routes
}