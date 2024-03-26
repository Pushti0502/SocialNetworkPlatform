const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const { v4: uuidv4 } = require('uuid');
const user = z.object({
    email: z.string().email(),
    googleId: z.string().optional(),
    password: z.string().min(6),
    username: z.string().optional(),
    saved: z.array().optional(),
    bio: z.string().optional(),
    experience: z.string().optional(),
    education: z.string().optional(),
    linkedin: z.string().optional(),
    profilephoto: z.string().optional(),
    github: z.string().optional(),
});
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    googleId: {
        type: String,
    },
    password: {
        type: String,
    },
    username: {
        type: String,
        trim: true,
    },
    bio: {
        type: String,
        trim: true,
    },
    experience: String,
    education: String,
    linkedin: String,
    profile: String,
    github: String,
    uuid: {
        type: String,
        default: uuidv4,
        unique: true,
    },

    savedposts: [],
    followers: [],
    following: [],
    profilephoto: {
        type:String,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
});
userSchema.pre('save', async function () {
    try {
        const userData = this.toObject();
        user.parse(userData);
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        console.log(error);
    }
});

userSchema.methods.createJWT = function () {
    try {
        return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
        });
    } catch (error) {
        console.log(error);
    }
};
const User = mongoose.model('User', userSchema);

module.exports = { User, user };
