import styles from './RecipeItem.module.scss';
import Link from "next/link";
import {useState} from "react";
import {capitalizeString} from "../../../utils/capitalizeString";
import {useRouter} from "next/router";

function RecipeItem(props) {
    const [showRecipe, setShowRecipe] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        router.push({
            pathname: `/recipes/${props.recipeId}`,
            query: {
                recipeId: props.recipeId,
            },

        }
        , `/recipes/${props.recipeId}`, {shallow: true});
    }

    return (
        <div
            className={styles.item}
            onMouseEnter={() => setShowRecipe(true)}
            onMouseLeave={() => setShowRecipe(false)}
            key={props.recipeId}
            onClick={handleClick}
        >
            <img className={styles.item__image} src={props.image} alt={props.title}/>
            {showRecipe && (
                <span className={styles.item__content}>{capitalizeString(props.title)}</span>)}
        </div>
    )
}

export default RecipeItem;