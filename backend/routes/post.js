const router = require('express').Router()
const {
    getPost,
    createPost,
    updatePost,
    deletePost,
    likeAndDislikePost,
    getTimelinePost,
    getAllUsersPost,
} = require('../controller/postController')

router.get('/', getPost)
router.get('/timeline/:userId', getTimelinePost)
router.get('/profile/:username', getAllUsersPost)
router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likeAndDislikePost)

module.exports = router
