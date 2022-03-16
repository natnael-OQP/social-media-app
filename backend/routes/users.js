const router = require('express').Router()
const {
    updateUser,
    deleteUser,
    getUser,
    followUser,
    unFollowUser,
} = require('../controller/userController')

// routes
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/follow/:id', followUser)

module.exports = router
