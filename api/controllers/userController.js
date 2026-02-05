const { users } = require('../models')

const getUsers = (req, res) => {
    users.getUsers(req, res)
}

const getUser = (req, res) => {
    users.getUser(req, res)
}

const register = (req, res) => {
    users.register(req, res)
}

const login = (req, res) => {
    users.login(req, res)
}

const updateUser = (req, res) => {
    users.updateUser(req, res)
}

const deleteUser = (req, res) => {
    users.deleteUser(req, res)
}

module.exports = {
    getUsers,
    getUser,
    register,
    login,
    updateUser,
    deleteUser
}
