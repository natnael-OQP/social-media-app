const router = require('express').Router()
const {
    getPost,
    createPost,
    updatePost,
    deletePost,
    likeAndDislikePost,
    getSinglePost,
} = require('../controller/postController')

router.get('/', getPost)
router.get('/:id', getSinglePost)
router.post('/', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likeAndDislikePost)

module.exports = router
