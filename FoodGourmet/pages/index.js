import Head from 'next/head';
import RecipeCarousel from "../components/recipe/carousel/RecipeCarousel";

export default function Home(props) {
    return (
        <>
            <Head>
                <title>Food Gourmet</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <RecipeCarousel recipes={props.recipes[0]} />
        </>

    )
}

export async function getStaticProps(props) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const data = await res.json();

    return {
        props: {
            recipes: data.meals.map(meal => ({
                id: meal.idMeal,
                title: meal.strMeal,
                image: meal.strMealThumb,
                instr: meal.strInstructions
            }))
        },
        revalidate: 30
    }
}

