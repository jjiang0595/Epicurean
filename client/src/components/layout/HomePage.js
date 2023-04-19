import styles from './HomePage.module.scss';
import {useRef, useState} from "react";
import {useRouter} from "next/router";
import AuthAlert from "../user/AuthAlert";


const HomePage = () => {

    const query = useRef("");
    const router = useRouter();

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
        <>
            <div className={styles.container}>
                           <AuthAlert />

                <h1 className={styles.search__header}>Epicurean</h1>
                <form action="#" className={styles.search} onSubmit={submitHandler}>
                    <button className={styles.search__button}>
                        <svg className={styles.search__icon}>
                            <use href={'/sprite.svg#icon-search'}></use>
                        </svg>
                    </button>
                    <input type="text" ref={query}
                           className={styles.search__input}
                           placeholder="Search for a recipe..."/>
                </form>
            </div>
        </>
    );
}

export default HomePage;