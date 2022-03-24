const asyncHandler = require('express-async-handler')
const Conversation = require('../model/conversation')

// create conversation
const createConversation = asyncHandler(async (req, res) => {
    const members = [req.body.senderId, req.body.receiveId]
    try {
        const conversation = await Conversation.create({ members: members })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get conversation
const getConversation = asyncHandler(async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = {
    createConversation,
    getConversation,
}
