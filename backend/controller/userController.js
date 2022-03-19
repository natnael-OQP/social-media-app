const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../model/user')

// update
const updateUser = asyncHandler(async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.status(200).json(user)
    } else {
        res.status(500).json({ message: 'you can update only your account ' })
    }
})

// delete user
const deleteUser = asyncHandler(async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        const user = await User.findById(req.params.id)
        !user && res.status(404).json({ message: 'Not Found' })
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'user deleted successfully' })
    } else {
        res.status(401).json({ message: 'you can update only your account' })
    }
})

// get user
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    !user && res.status(404).json({ message: 'Not Found' })
    const { password, isAdmin, ...other } = user._doc
    res.status(200).json(other)
})

// follow user
const followUser = asyncHandler(async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const follower = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await follower.updateOne({
                    $push: { following: req.params.id },
                })
                return res
                    .status(200)
                    .json({ message: 'followed successfully ' })
            } else {
                return res.status(401).json({
                    message: 'you already follow this user',
                })
            }
        } catch (error) {
            return res.status(400).json(error)
        }
    } else {
        return res.status(401).json({
            message: "you can't follow or unfollow yourself",
        })
    }
})

// un-follow user
const unFollowUser = asyncHandler(async (req, res) => {
    if (req.body.userId !== req.params.id) {
        const user = await User.findById(req.params.id)
        const unFollower = await User.findById(req.body.userId)
        if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } })
            await unFollower.updateOne({
                $pull: { followers: req.body.userId },
            })

            return res.status(200).json({ message: 'un-follow successfully ' })
        }
    } else {
        return res.status(401).json({
            message: "you can't follow or unfollow yourself",
        })
    }
})

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    followUser,
    unFollowUser,
}
