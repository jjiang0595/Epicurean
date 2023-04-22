import MovieList from "../../components/recipe/search/RecipeList";
import {useRouter} from "next/router";
import RecipeList from "../../components/recipe/search/RecipeList";
import {useEffect} from "react";

const SearchResults = (props) => {
    const router = useRouter();
    const query = router.query;

    useEffect(() => {
      document.title = 'Search | Epicurean'
    })

    return <RecipeList recipes={props.recipes} />
}

export async function getServerSideProps({query}) {
    const searchQuery = query.query;
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
        const data = await res.json();
        const recipes = data.meals;

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
    } catch (error) {
        return {
            props: {
                recipes: []
            }
        }
    }
}

export default SearchResults;