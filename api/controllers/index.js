const express = require('express')
const routes = express.Router()
const bodyParser = require('body-parser')
const {users} = require('../models')

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
module.exports = {
    express,
    routes
}