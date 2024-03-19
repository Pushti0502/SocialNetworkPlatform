const { User, user } = require('../Model/userSchema.js');
const Post = require('../Model/postSchema.js');
const multer = require('multer');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const { z } = require('zod');
require('dotenv').config();
const app = express();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const SECRET_KEY = process.env.GOOGLE_SECRET_KEY;

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
const registerSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(6),
});
const updateSchema = z.object({
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    username: z.string().min(3).optional(),
    bio: z.string().optional(),
    experience: z.string().optional(),
    education: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    profilephoto:z.string().optional()
});
const followuserSchema = z.object({
    currentUserId: z.string(),
});
const saveUnsaveSchema = z.object({
    id: z.string(),
    userId: z.string(),
});
const getSavedPostSchema = z.object({
    id: z.string(),
});
const idSchema = z.object({
    id: z.string(),
});
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
                    const hashedPassword = await bcrypt.hash(
                        randomPassword,
                        10
                    );
                    user = new User({
                        username: profile.displayName,
                        googleId: profile.googleId,
                        email: profile.emails[0].value,
                        password: hashedPassword,
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
const profilePhoto = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'profiles/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    });

    const upload = multer({ storage: storage });
    return upload;
};

const register = async (req, res) => {
    try {
        const {
            email,
            password,
            username,
            followers,
            following,
            bio,
            linkedin,
            github,
            education,
            experience,
            profilephoto,
            savedposts,
        } = registerSchema.parse(req.body);

        const existingUser = await User.findOne({ email });
        const uuid = uuidv4();
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            email,
            password,
            username,
            followers,
            following,
            bio,
            linkedin,
            github,
            education,
            experience,
            profilephoto,
            uuid,
            savedposts,
        });

        await user.save();

        const token = user.createJWT();

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ message: 'Validation failed', errors: error.errors });
        } else {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Password' });
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
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ message: 'Validation failed', errors: error.errors });
        } else {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
};
const update = async (req, res) => {
    const { userId } = req.params;
    const updatedFields = req.body;
    let profile = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

   
    if (req.file && req.file.path) {
        profile = req.file.path;
    }

    updatedFields = { ...updatedFields, profilephoto: profile };
    try {
        updateSchema.parse(updatedFields);
      
        const user = await User.findByIdAndUpdate(userId, updatedFields,{new: true});

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ message: 'Validation failed', errors: error.errors });
        } else {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json({ message: 'Fetch User Success!!', user });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: 'Validation error' });
        } else {
            res.status(500).json({
                message: 'Internal Server error',
                error: error.message,
            });
        }
    }
};

const followUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
    if (currentUserId === id) {
        res.status(403).json({ message: 'Action forbidden' });
    } else {
        try {
            followuserSchema.parse({ currentUserId });
            const followUser = await User.findById(id);
            const currentUser = await User.findById(currentUserId);
            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({
                    $push: { followers: currentUserId },
                });
                await currentUser.updateOne({ $push: { following: id } });

                const updatedcurrentUser = await User.findById(currentUserId);
                const followingUserIds = updatedcurrentUser.following;
                const user = [];
                for (const userId of followingUserIds) {
                    const userdata = await User.findById(userId);
                    user.push(userdata);
                }
                res.status(200).json({ message: 'User Followed', user });
            } else {
                res.status(403).json({message:"User is Already followed by you"});
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: 'Validation error ',
                    errors: error.errors,
                });
            } else {
                res.status(500).json({
                    message: 'Internal server error',
                    error: error.message,
                });
            }
        }
    }
};
const unfollowUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;
    if (currentUserId === id) {
        res.status(403).json({ message: 'Action forbidden' });
    } else {
        try {
            followuserSchema.parse({ currentUserId });
            const followUser = await User.findById(id);
            const currentUser = await User.findById(currentUserId);
            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({
                    $pull: { followers: currentUserId },
                });
                await currentUser.updateOne({ $pull: { following: id } });
                const updatedCurrentUser = await User.findById(currentUserId);
                const followingUserIds = updatedCurrentUser.following;
                const user = [];

                for (const userId of followingUserIds) {
                    const userdata = await User.findById(userId);
                    user.push(userdata);
                }
                res.status(200).json({
                    message: 'User Unfollowed',
                    user,
                });
            } else {
                res.status(404).json({message:"User is not followed by you"});
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: 'Validation error ',
                    errors: error.errors,
                });
            } else {
                res.status(500).json({
                    message: 'Internal server error',
                    error: error.message,
                });
            }
        }
    }
};
const getFollowingUserData = async (req, res) => {
    const { id } = req.params;
    try {
        const currentUser = await User.findById(id);
        const followingUserIds = currentUser.following;
        const user = await Promise.all(
            followingUserIds.map(async (userId) => {
                const userdata = await User.findById(userId);
                return userdata;
            })
        );

        res.status(200).json({ message: 'Fetch Data Success!!', user });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const saveUnsavePost = async (req, res) => {
    const { id, userId } = req.params;
    try {
        saveUnsaveSchema.parse({ id, userId });
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        const postIndex = user.savedposts.indexOf(id);
        if (postIndex == -1) {
            user.savedposts.push(id);
            await user.save();
            res.status(200).json({
                message: 'Post Saved  Successfully !!',
                user,
            });
        } else {
            user.savedposts.splice(postIndex, 1);
            await user.save();
            res.status(200).json({
                message: 'Post UnSaved  Successfully !!',
                user,
            });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ message: 'Validation error ', errors: error.errors });
        } else {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
};
const getSavedPost = async (req, res) => {
    const { id } = req.params;
    try {
        getSavedPostSchema.parse({ id });
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const savedPostsIds = user.savedposts;
        const posts = await Post.find({ _id: { $in: savedPostsIds } });

        res.status(200).json({ message: 'Fetched saved posts', posts });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ message: 'Validation error ', errors: error.errors });
        } else {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
};

const getAllUsers = async (req, res) => {
    const { currentuserid } = req.params;
    try {
        const user = await User.find();

        res.status(200).json({ message: 'Users fetched successfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server error',
            error: error.message,
        });
    }
};

module.exports = {
    register,
    login,
    update,
    getAllUsers,
    followUser,
    unfollowUser,
    saveUnsavePost,
    getSavedPost,
    getFollowingUserData,
    getUserById,
    profilePhoto
    
};
