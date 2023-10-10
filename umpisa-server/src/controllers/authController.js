const UserModel = require('../models/user')
const { hashPassword, comparePassword } = require('../utils/auth')
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

        if (match) {
            jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                    if (err) throw err

                    res.cookie('token', token).json(user)
                }
            )
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

const profile = (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    logoutUser,
    profile
}
