import styles from './MainNavigation.module.scss';
import Link from "next/link";
import Searchbar from "./Searchbar";
import React, {useContext} from "react";
import {AuthContext} from "../../store/AuthContext";

export default function MainNavigation() {
    const {user, handleLogout} = useContext(AuthContext);

    return (
        <nav className={styles.header}>
            <Link href={'/'} className={styles.header__logo}>Epicurean</Link>
            <Searchbar />
            {user && <Link href="/login" onClick={handleLogout} className={styles.header__auth}>Sign Out</Link>}
            {!user && <Link href="/login" className={styles.header__auth}>Login</Link>}
        </nav>
    )
}