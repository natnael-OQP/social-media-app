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

// get Single post
const getSinglePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        !post && res.status(404).json({ message: 'Port Not Found' })
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
const deletePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        !post && res.status(404).json({ message: 'Post Not Found' })
        if (req.body.userId === post.userId) {
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: 'post Deleted successfully' })
        } else {
            return res
                .status(401)
                .json({ message: "you can't delete other users post" })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

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
                .json({ message: "you can't update other users post" })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

// like and dislike post
const likeAndDislikePost = asyncHandler(async (req, res) => {
    try {
        let post = await Post.findById(req.params.id)
        !post && res.status(404).json({ message: 'Post Not Found' })
        if (req.body.userId !== post.userId) {
            if (!post.likes.includes(req.body.userId)) {
                await post.updateOne({ $push: { likes: req.body.userId } })
                return res
                    .status(200)
                    .json({ message: 'the post has been liked' })
            } else {
                await post.updateOne({ $pull: { likes: req.body.userId } })
                return res
                    .status(200)
                    .json({ message: 'the post has been disliked' })
            }
        } else {
            return res
                .status(401)
                .json({ message: "you can't follow yur post" })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = {
    getPost,
    createPost,
    deletePost,
    updatePost,
    likeAndDislikePost,
    getSinglePost,
}
