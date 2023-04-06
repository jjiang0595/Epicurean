import React from "react";
import RecipeDetail from "../../../components/recipe/search/RecipeDetail";

const RecipeDetails = (props) => {
    return (
        <RecipeDetail recipes={props.recipes} />
    );
}

export async function getServerSideProps(context) {
    const recipeKey = context.params.recipeId;
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const recipes = data.meals[0];
    console.log(url, recipes)

    if (recipes === null) {
        return {
            props: {
                recipes: []
            },
        }
    }

    return {
        props: {
            recipes: {
                key: recipes.idMeal,
                title: recipes.strMeal,
                image: recipes.strMealThumb,
                instr: recipes.strInstructions
            }
        },
    }
}

export default RecipeDetails;
