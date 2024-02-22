const express = require('express');
const router = express.Router();
const passport = require('passport');

const { register, login } = require("../Controllers/authController.js");

router.post("/signup", register);
router.post("/login", login);


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
