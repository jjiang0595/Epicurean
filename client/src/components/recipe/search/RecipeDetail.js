import styles from './RecipeDetail.module.scss';
import {useEffect, useRef, useState} from "react";
import RecipeReviews from "../RecipeReviews";
import {capitalizeString} from "../../../utils/capitalizeString";

function RecipeDetail(props) {
    const [recipe, setRecipe] = useState({strMeal: "Recipe", strMealThumb: "", strInstructions: ""})
    const {recipeId} = props;

    useEffect(() => {
        const recipeData = localStorage.getItem(`recipe_${recipeId}`);

        if (recipeData) {
            setRecipe(JSON.parse(recipeData));
        } else {
            const fetchRecipe = async () => {
                try {
                    const res = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeId);
                    const data = await res.json();
                    if (data.meals && data.meals.length > 0) {
                        setRecipe(data.meals[0]);

                        const ingredients = [];
                        const measures = [];
                        Object.keys(data.meals[0]).forEach(key => {
                            if (key.includes("strIngredient") && data.meals[0][key] !== "" && data.meals[0][key] !== null) {
                                ingredients.push(data.meals[0][key]);
                            }
                            if (key.includes("strMeasure") && data.meals[0][key] !== "" && data.meals[0][key] !== null) {
                                measures.push(data.meals[0][key]);
                            }
                        });

                        data.meals[0].ingredients = ingredients;
                        data.meals[0].measures = measures;

                        localStorage.setItem(`recipe_${recipeId}`, JSON.stringify(data.meals[0]));
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            fetchRecipe();
        }
    }, [recipeId]);

    useEffect(() => {
        document.title = capitalizeString(`${recipe.strMeal} - Epicurean`);
    }, [recipe]);

    return (
        <>
            <div className={styles.recipe}>
                <img className={styles.recipe__image} src={recipe.strMealThumb} alt={recipe.strMeal}/>
                <div>
                    <div className={styles.recipe__title}>{capitalizeString(recipe.strMeal)}</div>
                    <ul className={styles.recipe__ingredients}>
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            <li className={styles.recipe__ingredients__item}
                                key={index}>{ingredient} - {recipe.measures[index]}</li>
                        ))}
                    </ul>
                    <div className={styles.recipe__instructions}
                         style={{whiteSpace: "pre-line"}}>{recipe.strInstructions}</div>
                </div>
            </div>
            <div className={styles.separatorContainer}>
                <div className={styles.separator}></div>
                <div className={styles.separatorText}>
                    Reviews Below
                </div>
                <div className={styles.separator}></div>
            </div>
            <RecipeReviews gridColumn="1 / -1" recipeId={recipe.idMeal}/>
        </>
    );
}

export default RecipeDetail;