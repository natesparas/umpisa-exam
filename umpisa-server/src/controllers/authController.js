const UserModel = require('../models/user')
const {
    hashPassword,
    comparePassword,
    generateRefreshToken,
    generateAccessToken,
    isRefreshTokenExpired
} = require('../utils/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json('Test is working!')
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // Check email
        if (!email) {
            return res.json({
                error: 'Email is required'
            })
        }

        // Check password
        if (!password) {
            return res.json({
                error: 'Password is required'
            })
        }

        // Check if user exist
        const user = await UserModel.findOne({
            email
        })
        if (!user) {
            return res.json({
                error: 'User not found'
            })
        }

        // Chekc if password match
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.json({
                error: 'Password is not matched'
            })
        }

        const payload = { id: user._id, email: user.email }

        if (match) {
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
            })

            const data = {
                user,
                accessToken: token,
                refreshToken: generateRefreshToken(payload)
            }
            // const newUserData = [user].map((item) => ({ ...item, token: token }))
            return res.json(data)
        }
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body

        // Check if name was entered
        if (!firstname || !lastname) {
            return res.json({
                error: 'Name is required'
            })
        }

        // Check if password is good
        if (!password || password.length < 5) {
            return res.json({
                error: 'Password is required and should be at least 5 characters long'
            })
        }

        // Check email
        const exist = await UserModel.findOne({ email })
        if (exist) {
            return res.json({
                error: 'Email is already taken'
            })
        }

        const hashedPassword = await hashPassword(password)
        const user = await UserModel.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })

        return res.json(user)
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie('token')
    res.json(null)
}

const refreshToken = async (req, res) => {
    const expiredAccessToken = req.header('Authorization')
    const refreshToken = req.body.refreshToken

    if (!expiredAccessToken || !refreshToken) {
        return res.status(400).json({ message: 'Access token and refresh token are required.' })
    }

    // return unauthorized if refresh token is expired, thus, user must login again to gain new acces and refresh token
    const isExpired = await isRefreshTokenExpired(refreshToken)
    if (isExpired) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Refresh token is invalid or expired.' })
        }

        // Generate a new access token
        const payload = { id: decoded.id, email: decoded.email }
        const newAccessToken = generateAccessToken(payload)

        res.json({ accessToken: newAccessToken })
    })
}

module.exports = {
    test,
    registerUser,
    loginUser,
    logoutUser,
    refreshToken
}
