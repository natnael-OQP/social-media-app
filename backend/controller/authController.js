const asyncHandler = require('express-async-handler')
const User = require('../model/user')
const bcrypt = require('bcrypt')

// register
const registerUser = asyncHandler(async (req, res) => {
    const {
        username,
        password,
        email,
        profilePic,
        coverPicture,
        followers,
        following,
        isAdmin,
    } = req.body
    try {
        if (!username || !email || !password) {
            res.status(400).json({ message: 'fill required fields' })
        }
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hashSync(password, salt)
        // user info
        const createdUser = {
            username,
            password: hashPassword,
            email,
            profilePic,
            coverPicture,
            followers,
            following,
            isAdmin,
        }
        const user = await User.create(createdUser)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json(error)
    }
})
// login
const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'homepage' })
})

module.exports = {
    registerUser,
    loginUser,
}
