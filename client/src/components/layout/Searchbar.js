import styles from './Searchbar.module.scss';
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";

const Searchbar = (props) => {
    const query = useRef("");
    const [showSearch, setShowSearch] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1000px)');
        const handleMediaQueryChange = (e) => {
            if (e.matches) {
                setShowSearch(false);
            } else {
                setShowSearch(true);
            }
        }
        mediaQuery.addEventListener('change', handleMediaQueryChange);
    }, [])

    const submitHandler = (event) => {
        if (query.current.value?.length > 2) {
            event.preventDefault();

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

    return (
        <form action="#" className={styles.search} onSubmit={submitHandler}>
            <button className={styles.search__button} onClick={() => setShowSearch((state) => !state)} type="button">
                <svg className={`${styles.search__icon} ${showSearch ? styles.rotated : styles.original}`}>
                    <use href={showSearch ? '/sprite.svg#icon-empty-glass' : '/sprite.svg#icon-full-glass'}></use>
                </svg>
            </button>
            {showSearch &&
                <input type="text" ref={query}
                       className={styles.search__input}
                       placeholder="Search for a recipe..." />
            }
            {showSearch ? <div className={styles.overlay} onClick={() => setShowSearch(false)}/> : null}
        </form>
    )
}

export default Searchbar;