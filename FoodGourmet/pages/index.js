import Head from 'next/head';
import RecipeCarousel from "../components/recipe/RecipeCarousel";

export default function Home() {
    return (
        <>
            <Head>
                <title>Food Gourmet</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <RecipeCarousel/>
        </>

    )
}
