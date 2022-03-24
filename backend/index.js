const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
// import
const dbConnection = require('./config/db')
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')
const conversationRoutes = require('./routes/conversation')
const messageRoutes = require('./routes/message')

// initialize
dotenv.config()
dbConnection()
const app = express()

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())

// apis
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/conversation', conversationRoutes)
app.use('/api/message', messageRoutes)

app.listen(process.env.PORT || 8000, () => {
    console.log(`backend server => http://localhost:8000`)
})
