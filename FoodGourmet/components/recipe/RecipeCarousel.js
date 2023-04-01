import styles from './RecipeCarousel.module.scss';
import {useState} from "react";
import RecipeInstructions from "./RecipeInstructions";

export default function RecipeCarousel(props) {
    const [recipe, setRecipe] = useState({
        title: capitalizeString(props.recipes.title),
        image: props.recipes.image,
        instr: props.recipes.instr
    });
    const [active, setActive] = useState(false);
    const [showRecipe, hideRecipe] = useState(true);

    function capitalizeString(string) {
        const title = string.split(" ");
        for (let i = 0; i < title.length; i++) {
            title[i] = title[i].charAt(0).toUpperCase() + title[i].slice(1);
        }
        return title.join(" ");
    }

    function lowercaseString(string) {
        const title = string.split(" ");
        for (let i = 0; i < title.length; i++) {
            title[i] = title[i].charAt(0).toLowerCase() + title[i].slice(1);
        }
    }

    const nextRecipe = () => {
        setTimeout(async () => {
            await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
                .then(res => res.json())
                .then(data => {
                    setActive(false);
                    const recipe = data.meals[0];
                    setRecipe({
                        title: capitalizeString(recipe.strMeal),
                        image: recipe.strMealThumb,
                        instr: recipe.strInstructions
                    })
                    hideRecipe(true);
                })
                .catch(err => console.log(err))
        }, 500)
        setActive(true);
    }

    const toggleRecipeVisibility = () => {
        hideRecipe(!showRecipe);
    }

    return (
        <div className={styles.carousel}>
            <div className={styles.carousel__container}>
                <div className={styles.carousel__container__item}>
                    <img
                        className={`${styles.carousel__container__item__image}`}
                        src={recipe.image}
                        alt=""
                    />
                    <button type="button" onClick={toggleRecipeVisibility}
                            className={styles.carousel__container__item__infoButton}>
                        <svg className={styles.carousel__container__item__infoButton__icon}>
                            <use href="/sprite.svg#icon-spoon-knife"></use>
                        </svg>
                    </button>
                    <div className={styles.carousel__container__item__instructions} style={{
                        opacity: !showRecipe ? '1' : '0',
                        visibility: !showRecipe ? 'visible' : 'hidden',
                        transition: 'opacity 0.25s ease-in-out, visibility 0.25s ease-in-out'
                    }}>
                        {!showRecipe && <RecipeInstructions instr={recipe.instr} title={recipe.title}/>}
                    </div>

                    <button type="button" onClick={nextRecipe} className={styles.carousel__container__item__nextButton}
                            disabled={active}>
                        <svg className={styles.carousel__container__item__nextButton__icon}>
                            <use href="/sprite.svg#icon-chevron-right"></use>
                        </svg>
                    </button>
                </div>
                <div className={styles.carousel__container__content}>
                    <h3 className={styles.carousel__container__content__title}>{capitalizeString(recipe.title)}</h3>
                </div>
            </div>
        </div>
    )
}