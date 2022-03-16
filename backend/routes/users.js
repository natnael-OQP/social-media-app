const {
    updateUser,
    deleteUser,
    getUser,
    followUser,
    unFollowUser,
} = require('../controller/userController')

const router = require('express').Router()

router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
