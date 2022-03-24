const router = require('express').Router()
const { createMessage, getMessage } = require('../controller/messageController')

router.post('/', createMessage)
router.get('/:id', getMessage)

module.exports = router
