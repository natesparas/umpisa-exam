const jwt = require('jsonwebtoken')
const { isTokenExpired } = require('../utils/auth')

const jwtValidation = async (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const isExpired = await isTokenExpired(token)
    // refresh token if expired
    if (isExpired) {
        return res.status(401).json({ message: 'Token Expired' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // You can now access user information in your routes.
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

module.exports = { jwtValidation }
