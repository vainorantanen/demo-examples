const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const messagesRouter = require('./controllers/messages')

mongoose.set('strictQuery', false)

console.log('connecting to MongoDB')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/messages', messagesRouter)

module.exports = app