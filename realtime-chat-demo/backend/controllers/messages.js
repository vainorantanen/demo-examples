const router = require('express').Router()
const Message = require('../models/message')

const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const messages = await Message
    .find({})
    .populate('user')
  response.json(messages)
})

router.post('/', userExtractor, async (request, response) => {

  const { content } = request.body

  const message = new Message({
    content,
    timeStamp: new Date()
  })

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  message.user = user._id

  let createdMessage = await message.save()

  createdMessage = await Message.findById(createdMessage._id).populate('user')

  response.status(201).json(createdMessage)
})

module.exports = router