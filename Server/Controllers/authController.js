const User = require('../Model/userSchema.js');
const bcrypt = require('bcrypt');
const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');

require('dotenv').config();
const app = express();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const SECRET_KEY = process.env.GOOGLE_SECRET_KEY;


passport.use(
    new GoogleStrategy(
        {
            clientID: CLIENT_ID,
            clientSecret: SECRET_KEY,
            callbackURL: 'http://localhost:8000/user/auth/google/callback',
            scope: ['profile', 'email'],
        },
        async (accessToken, refreshToken, profile, cb) => {
          
            try {
                let user = await User.findOne({ googleId: profile.id });
                if (!user) {
                    const randomPassword = Math.random().toString(36).slice(-8);
                    const hashedPassword = await bcrypt.hash(randomPassword, 10);
                    user = new User({
                        username: profile.displayName,
                        googleId: profile.googleId,
                        email: profile.emails[0].value,
                        password: hashedPassword
                      
                    });
                    await user.save();
                }
                return cb(null, user);
            } catch (error) {
                return cb(error, null);
            }
        }
    )
);
passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((user, cb) => {
    cb(null, user);
});

const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        const existingUser = await User.findOne({ email });
        if (!username || !email || !password) {
            res.status(400);
            throw new Error('Please add all fields');
        }
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            email,
            password,
            username,
        });

        await user.save();

        const token = user.createJWT();

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user
            
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: `${password}+ ${user.password}
            +${isPasswordValid}Invalid password`,
            });
        }

        const token = user.createJWT();
        user.password = undefined;

        const options = {
            httpOnly: true,
        };
        res.status(200).cookie('token', token, options).json({
            message: 'Login successful',
            success: true,
            token,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { register, login };
