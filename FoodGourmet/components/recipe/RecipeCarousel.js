import styles from './RecipeCarousel.module.scss';
import {useState} from "react";

export default function RecipeCarousel(props) {
    const [recipe, setRecipe] = useState({title: props.recipes.title, image: props.recipes.image});
    const [active, setActive] = useState(false);

    function capitalizeString(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const nextRecipe = () => {
        setTimeout(async () => {
            await fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    setActive(false)
                    const recipe = data.recipes[0];
                    setRecipe({title: recipe.title, image: recipe.image})
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
                    <button type="button" onClick={nextRecipe} className={styles.carousel__container__item__button}
                            disabled={active}>
                        <svg className={styles.carousel__container__item__button__icon}>
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