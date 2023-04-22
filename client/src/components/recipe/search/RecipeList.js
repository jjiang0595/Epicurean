import styles from './RecipeList.module.scss';
import RecipeItem from "./RecipeItem";

function RecipeList(props) {
    return (
        <div className={styles.list}>
            {props.recipes.length > 0 ? props.recipes.map((recipe) => (
            <div className={styles.list__recipes}>
                    <RecipeItem key={recipe.key}
                                recipeId={recipe.key}
                                title={recipe.title}
                                image={recipe.image}
                                description={recipe.instr}
                    />
            </div>)) : <h1 className={styles.list__noRecipes}>Sorry, there are no results for your search term.</h1>}
        </div>
    );
}

export default RecipeList;