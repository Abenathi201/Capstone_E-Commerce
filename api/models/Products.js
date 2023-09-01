const db = require('../config/index');

class Products {
    // Get all products
    getProducts(req, res) {
        const query = `
        SELECT productID, productName, productPrice,
        imageURL, description
        FROM Products;
        `
        db.query(query, (err, results) => {
            if(err) {
                throw err
            } else {
                res.json({  status: res.statusCode, results  });
            }
        })
    }

    // Get a single product
    getProduct(req, res) {
        const query = `
        SELECT productID, productName, productPrice,
        imageURL, description
        FROM Products
        WHERE productID = ${req.params.id};
        ` 
        db.query(query, (err, result) => {
            if (err) {
                throw err
            } else {
                res.json({ status: res.statusCode, result });
            }
        })  
    }

    // Add a product
    addProduct(req, res) {
        const data = req.body 
        const query = `
        INSERT INTO Products
        SET ?;
        `
        db.query(query,[data], (err) => {
            if(err) {
                throw err
            } else {
                res.json({ status: res.statusCode, msg: "Product added!" })
            }
        })
    }

    // Update and or edit a single product
    updateProduct(req, res) {
        const query = `
        UPDATE Products
        SET ?
        WHERE productID = ?;
        `
        db.query(query, [req.body, req.params.id], (err) => {
                if(err) {
                    throw err
                } else {
                    res.json({ status: res.statusCode, msg: "Product updated!" })
            }
        })
    }

    // Patch product
    patchProduct(req, res) {
        const query = `
        UPDATE Products
        SET ?
        WHERE productID = ?;
        `
        db.query(query, [data, id], (err) => {
            if(err) {
                throw err
            } else {
                res.json({ status: res.statusCode, msg: "Product updated!" })
            }
        })
    }

    // Delete a product
    deleteProduct(req, res) {
        const query = `
        DELETE FROM Products
        WHERE productID = ${req.params.id};
        `
        db.query(query, (err) => {
            if(err) {
                throw err
            } else {
                res.json({ status: res.statusCode, msg: "Product deleted!" })
            } 
        })
    }
}

module.exports = Products;