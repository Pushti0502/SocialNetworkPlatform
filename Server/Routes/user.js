const express = require('express');
const router = express.Router();
const passport = require('passport');

const { register, login,update ,getAllUsers,followUser ,unfollowUser, saveUnsavePost, getSavedPost, getFollowingUserData, getUserById, profilePhoto, logout} = require("../Controllers/userController");

router.post("/signup", register);
router.post("/login", login);
router.patch("/:userId/update",profilePhoto().single('profile'), update);
router.get("/getusers",getAllUsers)
router.patch("/:id/follow",followUser)
router.patch("/:id/unfollow",unfollowUser)
router.patch("/:userId/saveunsavepost/:id",saveUnsavePost)
router.get("/:id/getsavedposts",getSavedPost)
router.get("/:id/getfollowinguser",getFollowingUserData)
router.get("/:id/getuserbyid",getUserById)
router.get("/logout",logout)

router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login', 
        successRedirect: 'http://localhost:3000/dashboard', 
    })
);

module.exports = router;
