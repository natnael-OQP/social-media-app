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
            return
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
        res.status(500).json(error)
    }
})
// login
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(401).json({ message: 'fill required fields ' })
            return
        }
        // check user
        const user = await User.findOne({ username })
        !user && res.status(404).json({ message: 'User Not Found' })
        // match
        const match = await bcrypt.compare(password, user.password)
        !match && res.status(404).json({ message: 'Wrong Credential' })
        const { password: pass, ...other } = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = {
    registerUser,
    loginUser,
}
