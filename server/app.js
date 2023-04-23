#!/c/Program Files/nodejs/node
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Connect to MongoDB
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@epicurean.sauhvxv.mongodb.net/epicurean`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

app.use(helmet());
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// Define routes
const reviewsRoutes = require('./routes/reviews');
app.use('/recipe', reviewsRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

