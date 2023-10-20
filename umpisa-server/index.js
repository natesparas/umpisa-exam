const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')

const { mongoose } = require('mongoose')
const cookieParser = require('cookie-parser')

const { jwtValidation } = require('./src/middlewares/jwtValidation')

// database connection
// mongoose
//     .connect(process.env.MONGO_URL)
//     .then(() => console.log('Database Connected'))
//     .catch((err) => console.log('Database not connected', err))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`)
})

const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./src/routes/authRoutes'))
app.use('/', jwtValidation, require('./src/routes/customer'))

const PORT = 8085
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
