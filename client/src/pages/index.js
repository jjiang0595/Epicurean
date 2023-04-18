import Head from 'next/head';
import RecipeCarousel from "../components/recipe/carousel/RecipeCarousel";
import HomePage from "../components/layout/HomePage";
export default function Home(props) {
    return (
        <>
            <Head>
                <title>Epicurean - Recipes and More</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <HomePage />
        </>

    )
}