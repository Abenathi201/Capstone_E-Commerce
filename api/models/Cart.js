const db = require('../config/index');

class Cart {
    // Get all cart items
    getItems(req, res) {
        const query = `
        SELECT c.productID, c.quantity, p.productName, p.productPrice, p.imageURL, p.description
        FROM Cart c
        JOIN Products p ON c.productID = p.productID;
        `;
        db.query(query, (err, results) => {
            if (err) {
                throw err;
            } else {
                res.json({ status: res.statusCode, results });
            }
        });
    }    

    // Add a product to the cart
    addItem(req, res) {
        const { productID, quantity } = req.body;
        const query = `
        INSERT INTO Cart (productID, quantity)
        VALUES (?, ?);
        `
        db.query(query, [productID, quantity], (err) => {
            if(err) {
                throw err;
            } else {
                res.json({ status: res.statusCode, msg: "Product added to the cart!" });
            }
        })
    }

    // Remove a product from the cart
    deleteItem(req, res) {
        const cartID = req.params.id;
        const query = `
        DELETE FROM Cart
        WHERE cartID = ?;
        `
        db.query(query, [cartID], (err) => {
            if(err) {
                throw err;
            } else {
                res.json({ status: res.statusCode, msg: "Product removed from the cart!" });
            }
        })
    }

    // Update the quantity of a product in the cart
    updateItem(req, res) {
        const cartID = req.params.id;
        const { quantity } = req.body;
        const query = `
        UPDATE Cart
        SET quantity = ?
        WHERE cartID = ?;
        `
        db.query(query, [quantity, cartID], (err) => {
            if(err) {
                throw err;
            } else {
                res.json({ status: res.statusCode, msg: "Cart item updated!" });
            }
        })
    }
}

module.exports = Cart;