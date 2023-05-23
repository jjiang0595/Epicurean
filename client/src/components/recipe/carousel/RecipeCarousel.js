import styles from './RecipeCarousel.module.scss';
import {useEffect, useState} from "react";
import RecipeInstructions from "./RecipeInstructions";
import {capitalizeString} from "../../../utils/capitalizeString";
import {useRouter} from "next/router";

export default function RecipeCarousel(props) {
    const [recipe, setRecipe] = useState({
        recipeId: props.recipes.recipeId,
        title: capitalizeString(props.recipes.title),
        image: props.recipes.image,
        instr: props.recipes.instr
    });
    const [active, setActive] = useState(false);
    const [showRecipe, hideRecipe] = useState(true);
    const [showInstr, setShowInstr] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1100px)');
        const handleMediaQueryChange = (e) => {
            if (e.matches) {
                setShowInstr(false);
            } else {
                setShowInstr(true);
            }
        }

        handleMediaQueryChange(mediaQuery);
        mediaQuery.addEventListener('change', handleMediaQueryChange);
    }, [])

    const nextRecipe = () => {
        setTimeout(async () => {
            await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
                .then(res => res.json())
                .then(data => {
                    setActive(false);
                    const recipe = data.meals[0];
                    setRecipe({
                        recipeId: recipe.idMeal,
                        title: capitalizeString(recipe.strMeal),
                        image: recipe.strMealThumb,
                        instr: recipe.strInstructions
                    })
                    console.log(recipe.recipeId)
                    hideRecipe(true);
                })
                .catch(err => console.log(err))
        }, 500)
        setActive(true);
    }

    const handleClick = () => {
        router.push({
                pathname: `/recipes/${recipe.recipeId}`,
                query: {
                    recipeId: recipe.recipeId,
                },
            }
            , `/recipes/${recipe.recipeId}`, {shallow: true});
    }

    const toggleRecipeVisibility = () => {
        hideRecipe(!showRecipe);
    }

    return (
        <div className={styles.carousel}>
            <div className={styles.carousel__container}>
                <div className={styles.carousel__container__item} onClick={toggleRecipeVisibility}>
                    <img
                        className={styles.carousel__container__item__image}
                        src={recipe.image}
                        alt=""
                    />
                    {showInstr && <div className={styles.carousel__container__item__instructions} style={{
                        opacity: !showRecipe ? '1' : '0',
                        visibility: !showRecipe ? 'visible' : 'hidden',
                        transition: 'opacity 0.25s ease-in-out, visibility 0.25s ease-in-out'
                    }}>
                        {!showRecipe && <RecipeInstructions instr={recipe.instr} title={recipe.title}/>}
                    </div>
                    }
                    {!showInstr && <>
                        <div className={styles.carousel__container__item__link} onClick={handleClick}>
                            {recipe.title}
                        </div>
                        <button type="button" onClick={nextRecipe} className={styles.carousel__container__item__button}
                                disabled={active}>
                            Next Recipe
                        </button>
                    </>}
                </div>
                {showInstr && <button type="button" onClick={nextRecipe} className={styles.carousel__container__item__nextButton}
                        disabled={active}>
                    <svg className={styles.carousel__container__item__nextButton__icon}>
                        <use href="/sprite.svg#icon-chevron-right"></use>
                    </svg>
                </button>
                }
            </div>
        </div>
    )
}