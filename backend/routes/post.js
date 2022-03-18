const router = require('express').Router()
const {
    getPost,
    createPost,
    updatePost,
    deletePost,
    likeAndDislikePost,
    getTimelinePost,
} = require('../controller/postController')

router.get('/', getPost)
router.get('/timeline/:userId', getTimelinePost)
router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likeAndDislikePost)

module.exports = router
