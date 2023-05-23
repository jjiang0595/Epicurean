import RecipeCarousel from "../../components/recipe/carousel/RecipeCarousel";
import {useEffect} from "react";
export default function Home(props) {
    useEffect(() => {
        document.title = 'Carousel | Epicurean'
    })

    return <RecipeCarousel recipes={props.recipes[0]} />
}

export async function getStaticProps(props) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const data = await res.json();

    return {
        props: {
            recipes: data.meals.map(meal => ({
                recipeId: meal.idMeal,
                title: meal.strMeal,
                image: meal.strMealThumb,
                instr: meal.strInstructions
            }))
        },
        revalidate: 30
    }
}

