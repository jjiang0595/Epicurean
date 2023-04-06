import MovieList from "../../components/recipe/search/RecipeList";
import {useRouter} from "next/router";
import RecipeList from "../../components/recipe/search/RecipeList";

const SearchResults = (props) => {
    const router = useRouter();
    const query = router.query;

    return <RecipeList recipes={props.recipes} />
}

export async function getServerSideProps({query}) {
    const searchQuery = query.query;
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
    const data = await res.json();
    const recipes = data.meals;

    if (recipes === null) {
        return {
            props: {
                recipes: []
            },
        }
    }
    return {
        props: {
            recipes: recipes.map(recipe => ({
                key: recipe.idMeal,
                title: recipe.strMeal,
                image: recipe.strMealThumb,
                instr: recipe.strInstructions
            }))
        },
    }
}

export default SearchResults;