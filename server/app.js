const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
require('dotenv').config();

const app = express();

// Connect to MongoDB
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const SECRET_KEY = process.env.SECRET_KEY;
mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@epicurean.sauhvxv.mongodb.net/epicurean`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,  // swap this to true later
        maxAge: 87000000
    },
}));

// Configure passport
passport.use(User.createStrategy());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Define routes
const reviewsRoutes = require('./routes/reviews');
app.use('/recipe', reviewsRoutes);
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
