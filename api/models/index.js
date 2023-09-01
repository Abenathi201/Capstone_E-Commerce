const Users = require('./Users');
const Products = require('./Products');
const Items = require('./Cart');

module.exports = {
    users: new Users,
    products: new Products,
    items: new Items
}