import styles from './Searchbar.module.scss';
import {useRef, useState} from "react";
import {useRouter} from "next/router";

const Searchbar = (props) => {
    const query = useRef("");
    const [showResults, setShowResults] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const router = useRouter();

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
            <button className={styles.search__button} onMouseEnter={() => setShowSearch(true)}>
                <svg className={`${styles.search__icon} ${showSearch ? styles.rotated : ''}`}
                     onTransitionEnd={handleAnimationEnd}>
                    <use href={isRotated ? '/sprite.svg#icon-empty-glass' : '/sprite.svg#icon-full-glass'}></use>
                </svg>
            </button>
            {isRotated &&
                <input type="text" ref={query}
                       className={`${styles.search__input} ${showResults ? styles.search__input__bottom : ''}`}
                       placeholder="Search for a recipe..."/>

            }
            {showResults ? <div className={styles.overlay} onClick={() => setShowResults(false)}/> : null}
        </form>
    )
}

export default Searchbar;