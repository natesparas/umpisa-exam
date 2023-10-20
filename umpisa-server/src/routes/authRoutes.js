const express = require('express')
const router = express.Router()
const cors = require('cors')
const {
    test,
    registerUser,
    loginUser,
    logoutUser,
    refreshToken
} = require('../controllers/authController')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/refreshToken', refreshToken)

module.exports = router
