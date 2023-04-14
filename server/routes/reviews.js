const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const Recipe = require('../models/recipe');

router.get('/:id', async (req, res) => {
    try {
        const reviews = await Recipe.findOne({ recipeId: req.params.id });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/:recipeId', async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const review = new Review({
            title: req.body.title,
            stars: req.body.stars,
            content: req.body.content,
        });

        // Find the recipe by ID
        let recipe = await Recipe.findOne({ recipeId: recipeId });

        if (!recipe) {
            recipe = new Recipe({recipeId: recipeId});
            await recipe.save();
        }


        // Push the review's _id into the comments array of the recipe
        recipe.reviews.push(review);
        await recipe.save();

        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
