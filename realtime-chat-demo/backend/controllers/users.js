const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (request, response) => {
  const { username, password } = request.body

  if ( !password || password.length < 3) {
    return response.status(400).json({
      error: '`password` is shorter than the minimum allowed length (3)'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

router.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = router