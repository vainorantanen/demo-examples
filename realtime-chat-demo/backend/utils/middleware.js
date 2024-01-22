const jwt = require('jsonwebtoken')

const User = require('../models/user')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }
  
  const tokenExtractor = (request, response, next) => {
    request.token = getTokenFrom(request)
    next()
  }

const userExtractor = async (request, response, next) => {
    const token = getTokenFrom(request)
  
    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }
  
      request.user = await User.findById(decodedToken.id)
    }
  
    next()
  }

  module.exports = {
    tokenExtractor,
    userExtractor,
  }