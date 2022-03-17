const asyncHandler = require('express-async-handler')
const Post = require('../model/post')

// get post
const getPost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.find()
        res.status(200).json(post)
    } catch (error) {
        res.status(403).json(error)
    }
})

// create post
const createPost = asyncHandler(async (req, res) => {
    const { userId, desc } = req.body
    if (userId && desc) {
        try {
            const post = await Post.create(req.body)
            return res.status(200).json(post)
        } catch (error) {
            res.status(404).json(error)
        }
    } else {
        return res.status(403).json({ message: 'fill required fields ' })
    }
})

// delete post
const deletePost = asyncHandler(async (req, res) => {})

// update post
const updatePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        !post && res.status(404).json({ message: 'Post Not Found' })
        if (req.body.userId === post.userId) {
            const updated = await Post.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            )
            res.status(200).json(updated)
        } else {
            return res
                .status(401)
                .json({ message: "yoy can't update other users post" })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

// like post
const likePost = asyncHandler(async (req, res) => {})

module.exports = {
    getPost,
    createPost,
    deletePost,
    updatePost,
    likePost,
}
