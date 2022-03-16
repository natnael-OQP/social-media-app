const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            unique: true,
        },
        profilePic: {
            type: String,
            default: '',
        },
        coverPicture: {
            type: String,
            default: '',
        },
        followers: {
            type: Array,
            default: [],
        },
        following: {
            type: Array,
            default: [],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        desc: {
            type: String,
            default: '',
        },
        city: {
            type: String,
            default: '',
        },
        education: {
            type: String,
            default: '',
        },
        relationships: {
            type: Number,
            enum: [1, 2, 3],
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', UserSchema)
