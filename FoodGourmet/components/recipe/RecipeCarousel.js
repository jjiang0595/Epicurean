import styles from './RecipeCarousel.module.scss';

export default function RecipeCarousel(props) {
    return (
        <div className={styles.carousel}>
            <div className={styles.carousel__container}>
                <div className={styles.carousel__container__item}>
                    <img
                        className={styles.carousel__container__item__image}
                        src={props.recipes.image}
                        alt=""/>
                    <button className={styles.carousel__container__item__button}>
                        <svg className={styles.carousel__container__item__button__icon}>
                            <use href="/sprite.svg#icon-chevron-right"></use>
                        </svg>
                    </button>
                </div>
                <div className={styles.carousel__container__content}>
                    <h3 className={styles.carousel__container__content__title}>{props.recipes.title}</h3>
                </div>
            </div>
        </div>
    )
}