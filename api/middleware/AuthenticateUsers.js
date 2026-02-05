const {sign, verify} = require('jsonwebtoken')
require("dotenv").config()

function createToken(user) {
    return sign({
        emailAdd: user.emailAdd,
        userID: user.userID,
        userRole: user.userRole
    },
    process.env.SECRET_KEY,
    {
        expiresIn: '1h'
    })
}

function verifyAToken(req, res, next) {
    try {
        const authHeader = req.headers["authorization"]
        if (!authHeader) {
            return res.status(401).json({
                status: 401,
                msg: "No token provided"
            })
        }

        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader

        verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: 401,
                    msg: "Invalid or expired token"
                })
            }
            req.user = decoded
            next()
        })
    } catch(e) {
        res.status(500).json({
            status: 500,
            msg: e.message
        })
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.userRole === 'admin') {
        next()
    } else {
        res.status(403).json({
            status: 403,
            msg: "Access denied. Admin privileges required."
        })
    }
}

module.exports = {
    createToken,
    verifyAToken,
    isAdmin
}
