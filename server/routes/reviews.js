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
            userId: req.body.userId
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

router.delete('/:recipeId/:userId', async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const userId = req.params.userId;

        let recipe = await Recipe.findOne({ recipeId: recipeId });
        const reviewIndex = recipe.reviews.findIndex(review => review.userId === userId);

        recipe.reviews.splice(reviewIndex, 1);
        await recipe.save();

        return res.json({ status: 'success' });
    } catch (err) {
        res.status(400).json({message: err.message })
    }
})

router.put('/:recipeId', async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const { title, content, stars, userId } = req.body;
        console.log(recipeId, title, content, stars, userId)

        const query = { recipeId: recipeId };
        const update = {
            $set: {
                'reviews.$[elem].title': title,
                'reviews.$[elem].content': content,
                'reviews.$[elem].stars': stars
            }
        };

        const options = {
            arrayFilters: [{ 'elem.userId': userId }]
        };

        const recipe = await Recipe.findOneAndUpdate(query, update, options);


        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(recipe);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});


module.exports = router;
