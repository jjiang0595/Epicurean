import Head from 'next/head';
import RecipeCarousel from "../components/recipe/RecipeCarousel";

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
    const res = await fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`);
    const data = await res.json();
    const recipes = data.recipes;

    return {
        props: {
            recipes: recipes.map(recipe => ({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
            }))
        },
        revalidate: 30
    }
}

