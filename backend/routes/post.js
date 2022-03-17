const router = require('express').Router()
const {
    getPost,
    createPost,
    updatePost,
} = require('../controller/postController')

router.get('/', getPost)
router.post('/', createPost)
router.put('/:id', updatePost)

module.exports = router
