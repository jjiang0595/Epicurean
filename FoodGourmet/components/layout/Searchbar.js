import styles from './Searchbar.module.scss';
import {useRef, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

const Searchbar = (props) => {
    const query = useRef("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const router = useRouter();

    const searchHandler = async (event) => {
        const query = event.target.value;
        setTimeout(async () => {
            if (query.length > 1) {
                setShowResults(true)
                await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.meals) {
                            const filteredRecipes = data.meals.filter((item, idx) => idx < 5).map(recipe => ({
                                key: recipe.idMeal,
                                title: recipe.strMeal,
                                image: recipe.strMealThumb,
                                instr: recipe.strInstructions
                            }));
                            setSearchResults(filteredRecipes);
                        } else {
                            setSearchResults([]);
                        }
                    })
                    .catch(err => console.log(err))
            } else {
                setShowResults(false);
                setSearchResults([]);
            }
        }, 500);
    }

    const deleteSearchTerm = () => {
        setSearchResults([]);
        setShowResults(false);
    }

    const submitHandler = (event) => {
        if (query.current.value?.length > 2) {
            event.preventDefault();
            setShowResults(false);

            router.push({
                pathname: '/search',
                search: `?query=${query.current.value}`,
                query: {
                    query: query.current.value,
                }
            })
        } else {
            event.preventDefault();
        }
    }

    const handleAnimationEnd = () => {
        setIsRotated(true);
    };


    return (
        <form action="#" className={styles.search} onSubmit={submitHandler}>
            <button className={styles.search__button}  onMouseEnter={() => setShowSearch(true)}>
                <svg className={`${styles.search__icon} ${showSearch ? styles.rotated : ''}`} onTransitionEnd={handleAnimationEnd}>
                    <use href={isRotated ? '/sprite.svg#icon-empty-glass' : '/sprite.svg#icon-full-glass'}></use>
                </svg>
            </button>
            {isRotated &&
                <>
                    <input type="text" ref={query} onChange={searchHandler}
                           className={`${styles.search__input} ${showResults ? styles.search__input__bottom : ''}`}
                           placeholder="Search for a recipe..."/>
                    <div className={styles.search__results}>
                        {showResults && searchResults.map((recipe) => (
                            <Link href={{
                                pathname: `/recipes/${recipe.key}`,
                                query: {
                                    recipeKey: recipe.idMeal,
                                    title: recipe.strMeal,
                                    image: recipe.strMealThumb,
                                    instr: recipe.strInstructions
                                }
                            }} as={`/recipes/${recipe.recipeKey}`} className={styles.search__results__item}
                                  onClick={deleteSearchTerm}>
                                <span className={styles.search__results__item__title}>{recipe.title}</span>
                            </Link>
                        ))}
                        {searchResults.length === 0 && showResults &&
                            <p className={styles.search__results__item}>No results found</p>}
                    </div>
                </>
            }
            {showResults ? <div className={styles.overlay} onClick={() => setShowResults(false)}/> : null}
        </form>
    )
}

export default Searchbar;