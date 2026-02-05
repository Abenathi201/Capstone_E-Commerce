const rateLimit = require('express-rate-limit');

// Rate limiter for login attempts
// Prevents brute force attacks by limiting failed login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: {
        status: 429,
        msg: "Too many login attempts. Please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true // Only count failed attempts
});

// Rate limiter for registration
// Prevents spam account creation
const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 registrations per hour per IP
    message: {
        status: 429,
        msg: "Too many accounts created from this IP. Please try again after an hour."
    },
    standardHeaders: true,
    legacyHeaders: false
});

// General API rate limiter
// Protects against DDoS and abuse
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per 15 minutes
    message: {
        status: 429,
        msg: "Too many requests. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = {
    loginLimiter,
    registerLimiter,
    apiLimiter
}
