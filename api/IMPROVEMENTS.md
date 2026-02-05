# Backend Improvements Documentation

This document details the improvements I made to the Capstone E-Commerce API backend, comparing the original implementation with the current state.

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Security Improvements](#2-security-improvements)
3. [Authentication & Authorization](#3-authentication--authorization)
4. [Database Improvements](#4-database-improvements)
5. [Package Updates](#5-package-updates)
6. [Error Handling](#6-error-handling)
7. [Code Organization](#7-code-organization)
8. [API Endpoints](#8-api-endpoints)

---

## 1. Project Structure

### Before
```
api/
├── index.js
├── config/
│   └── index.js
├── controllers/
│   └── index.js          # Routes + controller logic mixed
├── middleware/
│   ├── AuthenticateUsers.js
│   └── ErrorHandling.js
├── models/
│   ├── index.js
│   ├── Users.js
│   ├── Products.js
│   └── Cart.js
└── static/
```

### After
```
api/
├── index.js              # Simplified entry point
├── config/
│   └── index.js          # Enhanced database configuration
├── routes/               # NEW - Dedicated routes directory
│   ├── index.js          # Route aggregator
│   ├── userRoutes.js     # User route definitions
│   ├── productRoutes.js  # Product route definitions
│   └── cartRoutes.js     # Cart route definitions
├── controllers/          # Refactored - Business logic only
│   ├── userController.js
│   ├── productController.js
│   └── cartController.js
├── middleware/           # Enhanced with new middleware
│   ├── AuthenticateUsers.js
│   ├── ErrorHandling.js
│   ├── RateLimiter.js    # NEW
│   └── ValidateUser.js   # NEW
├── models/
│   ├── index.js
│   ├── Users.js
│   ├── Products.js
│   └── Cart.js
└── static/
```

### Why I Made This Change
- **Separation of Concerns**: Routes, controllers, and models now have distinct responsibilities
- **Maintainability**: It's now easier to find and modify specific functionality
- **Scalability**: I can add new features without cluttering existing files
- **Industry Standard**: This follows common Express.js project conventions

---

## 2. Security Improvements

### 2.1 SQL Injection Prevention

#### Before (Vulnerable)
```javascript
// Direct string interpolation - DANGEROUS
getUser(req, res) {
    const query = `
        SELECT * FROM Users
        WHERE userID = ${req.params.id};
    `
}

login(req, res) {
    const query = `
        SELECT * FROM Users
        WHERE emailAdd = '${emailAdd}';
    `
}
```

An attacker could input: `1; DROP TABLE Users; --` and destroy the database.

#### After (Secure)
```javascript
// Parameterized queries - SAFE
getUser(req, res) {
    const query = `
        SELECT * FROM Users
        WHERE userID = ?;
    `
    db.query(query, [req.params.id], (err, result) => { ... })
}

login(req, res) {
    const query = `
        SELECT * FROM Users
        WHERE emailAdd = ?;
    `
    db.query(query, [emailAdd], (err, result) => { ... })
}
```

#### Files I Changed
- `models/Users.js` - All queries now use parameterized placeholders
- `models/Products.js` - All queries now use parameterized placeholders

#### Why I Made This Change
SQL injection is one of the most common and dangerous web vulnerabilities (OWASP Top 10). By using parameterized queries, I ensure that user input is treated as data, not executable code. This prevents attackers from manipulating the database.

---

### 2.2 Password Security

#### Before
```javascript
// Any password accepted
if (!data.userPass) {
    return res.json({ msg: "Password is required." });
}
// A password like "1" would be accepted
```

#### After
```javascript
// Password must meet all requirements
function validatePassword(password) {
    const errors = [];
    if (!password || password.length < 8)
        errors.push("Password must be at least 8 characters long");
    if (!/[A-Z]/.test(password))
        errors.push("Password must contain at least one uppercase letter");
    if (!/[a-z]/.test(password))
        errors.push("Password must contain at least one lowercase letter");
    if (!/[0-9]/.test(password))
        errors.push("Password must contain at least one number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        errors.push("Password must contain at least one special character");
    return errors;
}
```

#### Password Requirements
| Requirement | Valid Example | Invalid Example |
|-------------|---------------|-----------------|
| Minimum 8 characters | `Password1!` | `Pass1!` |
| At least one uppercase | `Password1!` | `password1!` |
| At least one lowercase | `Password1!` | `PASSWORD1!` |
| At least one number | `Password1!` | `Password!!` |
| At least one special character | `Password1!` | `Password1` |

#### Files I Created
- `middleware/ValidateUser.js`

#### Why I Made This Change
Weak passwords are easily cracked through brute force or dictionary attacks. By enforcing strong password requirements, I significantly increase the security of user accounts.

---

### 2.3 Rate Limiting

#### Before
```javascript
// No protection - unlimited attempts allowed
routes.post('/login', bodyParser.json(), (req, res) => {
    users.login(req, res)
});

routes.post('/register', bodyParser.json(), (req, res) => {
    users.register(req, res)
});
```

An attacker could try millions of password combinations or create unlimited fake accounts.

#### After
```javascript
// Rate limited endpoints
routes.post('/login', loginLimiter, bodyParser.json(), (req, res) => {
    users.login(req, res)
});

routes.post('/register', registerLimiter, bodyParser.json(), (req, res) => {
    users.register(req, res)
});
```

#### Rate Limit Configuration
| Endpoint | Limit | Time Window | Purpose |
|----------|-------|-------------|---------|
| `/login` | 5 attempts | 15 minutes | Prevents brute force password attacks |
| `/register` | 5 accounts | 1 hour | Prevents spam account creation |

#### Files I Created
- `middleware/RateLimiter.js`

#### Why I Made This Change
Rate limiting is essential protection against:
- Brute force attacks (trying many passwords)
- Credential stuffing (using leaked password lists)
- Denial of service (overwhelming the server)
- Spam account creation

---

## 3. Authentication & Authorization

### 3.1 JWT Token Verification

#### Before (Broken)
```javascript
function verifyAToken(req, res, next) {
    try {
        const token = req.headers["authorization"]
        // Token retrieved but NEVER verified!
        next()  // Always passes through
    } catch(e) {
        res.json({ status: res.statusCode, msg: e.message })
    }
}
```

This middleware did nothing - any request would pass through regardless of token validity. An attacker could access protected routes without any authentication.

#### After (Working)
```javascript
function verifyAToken(req, res, next) {
    try {
        const authHeader = req.headers["authorization"]
        if (!authHeader) {
            return res.status(401).json({
                status: 401,
                msg: "No token provided"
            })
        }

        const token = authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : authHeader

        verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: 401,
                    msg: "Invalid or expired token"
                })
            }
            req.user = decoded  // Attach user info to request
            next()
        })
    } catch(e) {
        res.status(500).json({ status: 500, msg: e.message })
    }
}
```

#### Files I Changed
- `middleware/AuthenticateUsers.js`

#### Why I Made This Change
The original middleware gave a false sense of security. Any unauthenticated user could access protected routes. I fixed this by properly validating JWT tokens before allowing access.

---

### 3.2 JWT Token Payload

#### Before (Insecure)
```javascript
function createToken(user) {
    return sign({
        emailAdd: user.emailAdd,
        userPass: user.userPass,  // PASSWORD IN TOKEN!
    }, process.env.SECRET_KEY, { expiresIn: '1h' })
}
```

Storing passwords in tokens is dangerous - anyone can decode a JWT and read the payload.

#### After (Secure)
```javascript
function createToken(user) {
    return sign({
        emailAdd: user.emailAdd,
        userID: user.userID,
        userRole: user.userRole  // Only non-sensitive data
    }, process.env.SECRET_KEY, { expiresIn: '1h' })
}
```

#### Why I Made This Change
JWT tokens are Base64 encoded, not encrypted. Anyone can decode and read the payload. I removed the password from the token and only include non-sensitive data like userID and userRole.

---

### 3.3 User Ownership Verification

#### Before (No Ownership Check)
```javascript
// Any logged-in user could access ANY user's cart
routes.get('/items/:userID', verifyAToken, (req, res) => {
    cart.getItems(req, res, userID);
});

// User A could update User B's profile
routes.put('/users/:id', verifyAToken, (req, res) => {
    users.updateUser(req, res)
});
```

A malicious user could view other users' personal data, modify their profiles, or manipulate their shopping carts simply by changing the ID in the URL.

#### After (Ownership Enforced)
```javascript
// Users can only access their OWN cart (admins can access all)
routes.get('/items/:userID', verifyAToken, verifyOwnership, (req, res) => {
    cart.getItems(req, res, userID);
});

// Users can only update their OWN profile
routes.put('/users/:id', verifyAToken, verifyOwnership, (req, res) => {
    users.updateUser(req, res)
});
```

#### Ownership Middleware
```javascript
function verifyOwnership(req, res, next) {
    const requestedUserID = parseInt(req.params.userID || req.params.id);
    const loggedInUserID = req.user.userID;
    const isAdmin = req.user.userRole === 'admin';

    if (isAdmin) return next();  // Admins bypass

    if (requestedUserID !== loggedInUserID) {
        return res.status(403).json({
            status: 403,
            msg: "Access denied. You can only access your own resources."
        });
    }
    next();
}
```

#### Files I Created
- `middleware/ValidateUser.js`

#### Why I Made This Change
Without ownership verification, users could access other users' private data. This is a critical privacy and security issue. I implemented middleware that checks if the logged-in user owns the resource they're trying to access.

---

### 3.4 Route Protection Summary

| Endpoint | Before | After |
|----------|--------|-------|
| `GET /users` | No protection | Admin only |
| `GET /users/:id` | Token only | Token + Own profile or Admin |
| `PUT /users/:id` | Token only | Token + Own profile or Admin |
| `DELETE /users/:id` | Token only | Admin only |
| `POST /product-add` | No protection | Admin only |
| `PUT /products/:id` | No protection | Admin only |
| `DELETE /products/:id` | No protection | Admin only |
| `GET /items/:userID` | Token only | Token + Own cart or Admin |
| `POST /add-items/:userID` | Token only | Token + Own cart or Admin |
| `PUT /items/:userID/:cartID` | Token only | Token + Own cart or Admin |
| `DELETE /items/:userID/:cartID` | Token only | Token + Own cart or Admin |

---

## 4. Database Improvements

### 4.1 MySQL Driver Upgrade

#### Before
```javascript
const {createPool} = require('mysql');
```

#### After
```javascript
const mysql = require('mysql2');
```

#### Why I Made This Change
| Feature | mysql | mysql2 |
|---------|-------|--------|
| Performance | Slower | 2-3x faster |
| Promise Support | No | Yes (built-in) |
| Prepared Statements | Basic | Full support |
| Maintenance | Rarely updated | Actively maintained |
| Node.js Compatibility | Legacy | Modern versions |

I switched to mysql2 because it's faster, better maintained, and has better support for modern Node.js features.

---

### 4.2 Connection Pool Configuration

#### Before
```javascript
const connection = createPool({
    host: process.env.dbHost,
    database: process.env.dbName,
    user: process.env.dbUser,
    password: process.env.dbPwd,
    multipleStatements: true,
    connectionLimit: 30
})
```

#### After
```javascript
const connectionConfig = {
    host: process.env.dbHost,
    database: process.env.dbName,
    user: process.env.dbUser,
    password: process.env.dbPwd,
    multipleStatements: true,
    connectionLimit: 30,
    waitForConnections: true,    // Queue requests when pool is full
    queueLimit: 0,               // Unlimited queue
    connectTimeout: 10000,       // 10 second connection timeout
    enableKeepAlive: true,       // Keep connections alive
    keepAliveInitialDelay: 10000 // Ping every 10 seconds
};
```

#### Why I Made This Change
- **waitForConnections**: Prevents errors when all connections are in use
- **connectTimeout**: Fails fast if the database is unreachable
- **enableKeepAlive**: Prevents connections from being dropped by firewalls/proxies

---

### 4.3 Error Handling & Reconnection

#### Before
```javascript
// No error handling - server crashes on connection loss
connection.query('SELECT 1', (error) => {
    if (error) {
        console.error('Error:', error);
    }
});
```

If the database connection was lost, the server would crash.

#### After
```javascript
// Handle errors gracefully
pool.on('error', (err) => {
    console.error('Database pool error:', err.code);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Connection lost. Pool will auto-reconnect.');
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Too many connections.');
    } else if (err.code === 'ECONNREFUSED') {
        console.error('Connection refused.');
    }
});

// Retry failed queries automatically
function queryWithRetry(sql, params, callback, retries = 3) {
    pool.query(sql, params, (err, results) => {
        if (err && retries > 0 && isConnectionError(err)) {
            setTimeout(() => {
                queryWithRetry(sql, params, callback, retries - 1);
            }, 1000);
        } else {
            callback(err, results);
        }
    });
}

// Clean shutdown
process.on('SIGINT', () => {
    pool.end(() => process.exit(0));
});
```

#### Files I Changed
- `config/index.js`

#### Why I Made This Change
- **Error Handling**: The server no longer crashes on database errors
- **Auto-retry**: Temporary connection issues don't fail requests immediately
- **Graceful Shutdown**: Connections are properly closed when the server stops

---

## 5. Package Updates

| Package | Old Version | New Version | Change Type |
|---------|-------------|-------------|-------------|
| bcrypt | ^5.1.1 | ^5.1.1 | No change |
| body-parser | ^1.20.2 | ^1.20.3 | Patch |
| cookie-parser | ^1.4.6 | ^1.4.7 | Patch |
| cors | ^2.8.5 | ^2.8.5 | No change |
| dotenv | ^16.3.1 | ^16.4.7 | Minor |
| express | ^4.18.2 | ^4.21.2 | Minor |
| express-rate-limit | - | ^7.5.0 | **NEW** |
| jsonwebtoken | ^9.0.1 | ^9.0.2 | Patch |
| mysql | ^2.18.1 | - | **REMOVED** |
| mysql2 | - | ^3.12.0 | **NEW** (replacement) |
| nodemon | ^3.0.1 | ^3.1.9 | Minor |

### New npm Scripts
```json
{
  "scripts": {
    "start": "node index",
    "dev": "nodemon index",  // NEW - for development
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

I added a `dev` script so I can use nodemon during development for auto-reloading.

---

## 6. Error Handling

### Before
```javascript
// Crashes the server
db.query(query, (err, results) => {
    if(err) throw err  // CRASH!
    res.json({ results })
})
```

Using `throw` in async callbacks crashes the entire Node.js process.

### After
```javascript
// Returns proper error response
db.query(query, (err, results) => {
    if(err) {
        return res.status(500).json({
            status: 500,
            msg: 'Database error'
        });
    }
    res.json({ results })
})
```

### Files I Changed
- `models/Users.js`
- `models/Products.js`

### Why I Made This Change
Proper error responses allow the server to continue running and inform clients of the error instead of crashing. This makes the application much more stable in production.

---

## 7. Code Organization

### 7.1 Route Separation

#### Before (controllers/index.js - 104 lines)
```javascript
// Everything in one file
const express = require('express')
const routes = express.Router()
const { users, products, cart } = require('../models')

routes.get('/users', (req, res) => { users.getUsers(req, res) });
routes.get('/users/:id', (req, res) => { users.getUser(req, res) });
// ... 90+ more lines mixing routes for users, products, and cart
```

#### After (Separate files)

**routes/index.js** (11 lines)
```javascript
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const cartRoutes = require('./cartRoutes')

router.use(userRoutes)
router.use(productRoutes)
router.use(cartRoutes)
```

**routes/userRoutes.js** (28 lines)
```javascript
// Only user-related routes
router.get('/users', verifyAToken, isAdmin, userController.getUsers)
router.get('/users/:id', verifyAToken, verifyOwnership, userController.getUser)
// ...
```

**routes/productRoutes.js** (17 lines)
```javascript
// Only product-related routes
router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getProduct)
// ...
```

**routes/cartRoutes.js** (21 lines)
```javascript
// Only cart-related routes
router.get('/items/:userID', verifyAToken, verifyOwnership, cartController.getItems)
// ...
```

### 7.2 Controller Separation

**controllers/userController.js**
```javascript
const { users } = require('../models')

const getUsers = (req, res) => users.getUsers(req, res)
const getUser = (req, res) => users.getUser(req, res)
// ...
```

**controllers/productController.js**
```javascript
const { products } = require('../models')

const getProducts = (req, res) => products.getProducts(req, res)
// ...
```

**controllers/cartController.js**
```javascript
const { cart } = require('../models')

const getItems = (req, res) => {
    const userID = req.params.userID
    cart.getItems(req, res, userID)
}
// ...
```

### Why I Made This Change
| Aspect | Before | After |
|--------|--------|-------|
| Files to edit for user feature | 1 large file | 2 small files |
| Risk of breaking unrelated code | High | Low |
| Code readability | Poor | Good |
| Testing | Difficult | Easier |
| Team collaboration | Merge conflicts | Fewer conflicts |

---

## 8. API Endpoints

### Public Endpoints (No Authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Create new user account |
| POST | `/login` | Authenticate and get token |
| GET | `/products` | List all products |
| GET | `/products/:id` | Get single product |

### Protected Endpoints (Token Required)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/users/:id` | Own profile or Admin | Get user details |
| PUT | `/users/:id` | Own profile or Admin | Update user |
| GET | `/items/:userID` | Own cart or Admin | Get cart items |
| POST | `/add-items/:userID` | Own cart or Admin | Add to cart |
| PUT | `/items/:userID/:cartID` | Own cart or Admin | Update cart item |
| DELETE | `/items/:userID/:cartID` | Own cart or Admin | Remove from cart |

### Admin Only Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List all users |
| DELETE | `/users/:id` | Delete user |
| POST | `/product-add` | Add new product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

---

## Summary

### Security Vulnerabilities I Fixed
1. SQL Injection (6 vulnerable queries)
2. Broken Authentication (token was not being verified)
3. Sensitive Data in JWT (removed password from token)
4. Missing Authorization (added ownership checks)
5. Weak Passwords (added validation)
6. No Rate Limiting (added brute force protection)

### Code Quality Improvements I Made
1. Separated routes from controllers
2. Implemented proper error handling (no more crashes)
3. Added database reconnection handling
4. Updated all packages to latest versions
5. Upgraded from mysql to mysql2
6. Added development script with nodemon

### Files I Created
- `routes/index.js`
- `routes/userRoutes.js`
- `routes/productRoutes.js`
- `routes/cartRoutes.js`
- `controllers/userController.js`
- `controllers/productController.js`
- `controllers/cartController.js`
- `middleware/RateLimiter.js`
- `middleware/ValidateUser.js`

### Files I Modified
- `index.js`
- `config/index.js`
- `models/Users.js`
- `models/Products.js`
- `middleware/AuthenticateUsers.js`
- `package.json`

### Files I Removed
- `controllers/index.js` (replaced by separate route and controller files)
