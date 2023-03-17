import styles from './RecipeCarousel.module.scss';

export default function RecipeCarousel() {
    return (
        <div className={styles.carousel}>
            <div className={styles.carousel__container}>
                <div className={styles.carousel__container__item}>
                    <img
                        className={styles.carousel__container__item__image}
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
                        alt=""/>
                    <button className={styles.carousel__container__item__button}>
                        <svg className={styles.carousel__container__item__button__icon}>
                            <use href="/sprite.svg#icon-chevron-right"></use>
                        </svg>
                    </button>
                </div>
                <div className={styles.carousel__container__content}>
                    <h3 className={styles.carousel__container__content__title}>Recipe 1</h3>
                </div>
            </div>
        </div>
    )
}