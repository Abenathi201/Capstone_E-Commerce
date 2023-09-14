const db = require('../config/index');

class Cart{
    
    getItems(req, res, userID) {
        const query = `
            SELECT c.cartID, p.productName, p.productPrice, p.imageURL, c.quantity
            FROM Cart c
            JOIN Products p ON c.productID = p.productID
            WHERE c.userID = ?;
        `;
    
        db.query(query, [userID], (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json({ status: res.statusCode, results })
            }
        });
    }

    addItem(req, res, userID, productID, quantity) {
        const query = `
            INSERT INTO Cart (userID, productID, quantity)
            VALUES (?, ?, ?);
        `;
    
        db.query(query, [userID, productID, quantity], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json({ message: 'Product added to the cart!' });
            }
        });
    }

    updateItem(req, res, userID, cartID, quantity) {
        const query = `
            UPDATE Cart
            SET quantity = ?
            WHERE cartID = ? AND userID = ?;
        `;

        db.query(query, [quantity, cartID, userID], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json({ message: 'Cart item updated!' });
            }
        });
    }

    deleteItem(req, res, userID, cartID) {
        const query = `
            DELETE FROM Cart
            WHERE cartID = ? AND userID = ?;
        `;

        db.query(query, [cartID, userID], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.json({ message: 'Cart item deleted successfully' });
            }
        });
    }
}

module.exports = Cart;