const router = require('express').Router()
const {
    createConversation,
    getConversation,
} = require('../controller/conversationController')

// create conversation
router.post('/', createConversation)

// get conversation
router.get('/:userId', getConversation)

module.exports = router
