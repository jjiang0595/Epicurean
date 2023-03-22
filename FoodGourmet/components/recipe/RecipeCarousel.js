import styles from './RecipeCarousel.module.scss';
import {useState} from "react";
import RecipeInstructions from "./RecipeInstructions";

export default function RecipeCarousel(props) {
    const [recipe, setRecipe] = useState({title: capitalizeString(props.recipes.title), image: props.recipes.image, instr: props.recipes.instr});
    const [active, setActive] = useState(false);

    function capitalizeString(string) {
        const title = string.split(" ");
        for (let i = 0; i < title.length; i++) {
            title[i] = title[i].charAt(0).toUpperCase() + title[i].slice(1);

        }
        return title.join(" ");
    }

    const nextRecipe = () => {
        setTimeout(async () => {
            await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
                .then(res => res.json())
                .then(data => {
                    setActive(false)
                    const recipe = data.meals[0];
                    setRecipe({title: capitalizeString(recipe.strMeal), image: recipe.strMealThumb, instr: recipe.strInstructions})
                })
                .catch(err => console.log(err))
        }, 500)
        setActive(true)
    }

    return (
        <div className={styles.carousel}>
            <div className={styles.carousel__container}>
                <div className={styles.carousel__container__item}>
                    <img
                        className={styles.carousel__container__item__image}
                        src={recipe.image}
                        alt=""/>
                    {/*<RecipeInstructions instr={recipe.instr} title={recipe.title}/>*/}
                    <button type="button" className={styles.carousel__container__item__infoButton}>
                        <svg className={styles.carousel__container__item__infoButton__icon}>
                            <use href="/sprite.svg#icon-spoon-knife"></use>
                        </svg>
                    </button>
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