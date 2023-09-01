const db = require('../config/index');

class Items {
    // Get all products
    getItem(req, res) {
        const query = `
        SELECT cartID, itemName,
        itemURL, itemPrice, quantity
        FROM Cart;
        `
        db.query(query, (err, results) => {
            if(err) {
                throw err
            } else {
                res.json({  status: res.statusCode, results  });
            }
        })
    }

    // Add a product
    addItem(req, res) {
        const data = req.body 
        const query = `
        INSERT INTO Cart
        SET ?;
        `
        db.query(query,[data], (err) => {
            if(err) {
                throw err
            } else {
                res.json({ status: res.statusCode, msg: "Item added!" })
            }
        })
    }

    // Delete a product
    deleteItem(req, res) {
        const query = `
        DELETE FROM Cart
        WHERE cartID = ${req.params.id};
        `
        db.query(query, (err) => {
            if(err) {
                throw err
            } else {
                res.json({ status: res.statusCode, msg: "Item deleted!" })
            } 
        })
    }
}

module.exports = Items;