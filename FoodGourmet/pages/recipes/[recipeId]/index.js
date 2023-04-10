import React, {useEffect} from "react";
import RecipeDetail from "../../../components/recipe/search/RecipeDetail";
import {useRouter} from "next/router";

const RecipeDetails = (props) => {
    const router = useRouter();
    const { recipeId } = router.query;

    return (
        <RecipeDetail recipeId={recipeId}/>
    );
}

export default RecipeDetails;
