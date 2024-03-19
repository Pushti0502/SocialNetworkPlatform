const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const session = require('express-session');
const authRoute = require('../Server/Routes/user.js');
const postRoute = require('../Server/Routes/post.js');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use('/profiles', express.static('profiles'));
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'Social12345',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);
app.use(passport.initialize());

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use('/user', authRoute);
app.use('/post', postRoute);
