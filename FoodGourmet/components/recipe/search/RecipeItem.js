import styles from './RecipeItem.module.scss';
import Link from "next/link";
import {useState} from "react";
import {capitalizeString} from "../../../utils/capitalizeString";

function RecipeItem(props) {
    const [showRecipe, setShowRecipe] = useState(false);

    return (
        <Link
            href={`/recipes/${props.key}`}
            as={`/recipes/${props.recipeId}`}
            className={styles.item}
            onMouseEnter={() => setShowRecipe(true)}
            onMouseLeave={() => setShowRecipe(false)}
        >
            <img className={styles.item__image} src={props.image} alt={props.title}/>
            {showRecipe && (
                <span className={styles.item__content}>{capitalizeString(props.title)}</span>)}
        </Link>
    )
}

export default RecipeItem;