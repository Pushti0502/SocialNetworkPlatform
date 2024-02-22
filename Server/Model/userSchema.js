const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

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

    connections: {
        type: Array,
        default: [],
    },
    profilephoto: String,
});


  userSchema.pre('save', async function () {
    try {
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

module.exports = User;
