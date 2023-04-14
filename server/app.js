const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
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


// Middleware
app.use(bodyParser.json()); // Parse JSON request body
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request body
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Define routes
const reviewsRoutes = require('./routes/reviews');
app.use('/recipe', reviewsRoutes);



// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});