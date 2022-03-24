const asyncHandler = require('express-async-handler')
const Message = require('../model/message')

// create
const createMessage = asyncHandler(async (req, res) => {
    try {
        const message = await Message.create(req.body)
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get
const getMessage = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.id,
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = {
    createMessage,
    getMessage,
}
