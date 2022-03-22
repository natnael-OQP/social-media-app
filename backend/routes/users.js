const router = require('express').Router()
const {
    updateUser,
    deleteUser,
    getUser,
    followUser,
    unFollowUser,
    getFiends,
} = require('../controller/userController')

// routes
router.get('/:id', getUser)
router.get('/friends/:id', getFiends)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/follow/:id', followUser)
router.put('/unfollow/:id', unFollowUser)

module.exports = router
