// Middleware to verify users can only access their own resources

function verifyOwnership(req, res, next) {
    const requestedUserID = parseInt(req.params.userID || req.params.id);
    const loggedInUserID = req.user.userID;
    const isAdmin = req.user.userRole === 'admin';

    // Admins can access any resource
    if (isAdmin) {
        return next();
    }

    // Regular users can only access their own resources
    if (requestedUserID !== loggedInUserID) {
        return res.status(403).json({
            status: 403,
            msg: "Access denied. You can only access your own resources."
        });
    }

    next();
}

// Password validation rules
function validatePassword(password) {
    const errors = [];

    if (!password || password.length < 8) {
        errors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)");
    }

    return errors;
}

// Middleware to validate password on registration/update
function validatePasswordMiddleware(req, res, next) {
    const { userPass } = req.body;

    // Skip if no password provided (e.g., updating other fields)
    if (!userPass) {
        return next();
    }

    const errors = validatePassword(userPass);

    if (errors.length > 0) {
        return res.status(400).json({
            status: 400,
            msg: "Password does not meet requirements",
            errors: errors
        });
    }

    next();
}

module.exports = {
    verifyOwnership,
    validatePassword,
    validatePasswordMiddleware
}
