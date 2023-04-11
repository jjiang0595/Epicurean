import styles from './RecipeList.module.scss';
import RecipeItem from "./RecipeItem";

function RecipeList(props) {
    return (
        <div className={styles.list}>
            <div className={styles.list__recipes}>
                {props.recipes.length > 0 ? props.recipes.map((recipe) => (
                    <RecipeItem key={recipe.key}
                                recipeId={recipe.key}
                                title={recipe.title}
                                image={recipe.image}
                                description={recipe.instr}
                    />
                )) : <p>No recipes found</p>}
            </div>
        </div>
    );
}

export default RecipeList;