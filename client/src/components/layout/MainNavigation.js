import styles from './MainNavigation.module.scss';
import Link from "next/link";
import Searchbar from "./Searchbar";
import React, {useContext} from "react";
import {AuthContext} from "../../store/AuthContext";
import {useRouter} from "next/router";

export default function MainNavigation() {
    const {user, handleLogout} = useContext(AuthContext);

    const router = useRouter();

    const excludedRoutes = ['/'].includes(router.pathname);

    return (
        <nav className={styles.header}>
            <div className={styles.header__container}>
                <Link href={'/'} className={styles.header__logo}>Epicurean</Link>
                <Link href={'/carousel'} className={styles.header__carousel}>
                    <svg className={styles.header__carousel__icon}>
                        <use href="/sprite.svg#icon-dice" className={styles.header__icon}></use>
                    </svg>
                    <p className={styles.header__carousel__text}>Random Recipe</p>
                </Link>
            </div>
            {!excludedRoutes && <Searchbar />}
            {user && <Link href="/" onClick={handleLogout} className={styles.header__auth}>Sign Out</Link>}
            {!user && <Link href="/login" className={styles.header__auth}>Login</Link>}
        </nav>
    )
}