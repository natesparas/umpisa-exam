const jwt = require('jsonwebtoken')

function jwtValidation(req, res, next) {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key')
        req.user = decoded // You can now access user information in your routes.
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

module.exports = jwtValidation
