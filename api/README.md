# Capstone E-Commerce API

A RESTful API for an e-commerce application built with Node.js, Express, and MySQL.

## Features

- User authentication with JWT tokens
- Role-based access control (User/Admin)
- Product management
- Shopping cart functionality
- Rate limiting for security
- Password strength validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 4.21
- **Database**: MySQL (mysql2 driver)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Rate Limiting**: express-rate-limit

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL database

### Installation

1. Clone the repository and switch to the backend branch:
   ```bash
   git checkout backend
   ```

2. Navigate to the API directory:
   ```bash
   cd api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file with your configuration:
   ```env
   dbHost=your_database_host
   dbName=your_database_name
   dbUser=your_database_user
   dbPwd=your_database_password
   SECRET_KEY=your_jwt_secret_key
   PORT=5000
   ```

5. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Public Endpoints

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

## Authentication

Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Password Requirements

Passwords must meet the following criteria:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (!@#$%^&*(),.?":{}|<>)

## Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/login` | 5 attempts | 15 minutes |
| `/register` | 5 accounts | 1 hour |

## Project Structure

```
api/
├── index.js              # Application entry point
├── config/
│   └── index.js          # Database configuration
├── routes/
│   ├── index.js          # Route aggregator
│   ├── userRoutes.js     # User endpoints
│   ├── productRoutes.js  # Product endpoints
│   └── cartRoutes.js     # Cart endpoints
├── controllers/
│   ├── userController.js
│   ├── productController.js
│   └── cartController.js
├── middleware/
│   ├── AuthenticateUsers.js  # JWT verification
│   ├── ErrorHandling.js      # Global error handler
│   ├── RateLimiter.js        # Rate limiting
│   └── ValidateUser.js       # Ownership & password validation
├── models/
│   ├── index.js
│   ├── Users.js
│   ├── Products.js
│   └── Cart.js
└── static/               # Static files
```

## Security Features

- SQL injection prevention (parameterized queries)
- JWT token authentication
- Password hashing with bcrypt
- Rate limiting on sensitive endpoints
- Role-based access control
- User ownership verification

## Documentation

See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for detailed documentation on all improvements made to this codebase.

## License

ISC