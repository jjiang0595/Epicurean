import styles from './RecipeDetail.module.scss';

function RecipeDetail(props) {
    const { recipes } = props;
    console.log(recipes);

    return (
        <div className={styles.recipe}>
            <div>
                <img src={recipes.image} alt={recipes.title} />
                <div className={styles.recipe__rating}>RATING</div>
            </div>
            <div>
                <div className={styles.recipe__title}>NAME</div>
                <div className={styles.recipe__ingredients}>INGREDIENTS</div>
                <div className={styles.recipe__instructions}>INSTRUCTIONS</div>
            </div>
            <div className={styles.recipe__comments}>COMMENTS</div>
        </div>
    );
}

export default RecipeDetail;