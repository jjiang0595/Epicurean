import styles from './MainNavigation.module.scss';
import Link from "next/link";
import Searchbar from "./Searchbar";

export default function MainNavigation() {
    return (
        <nav className={styles.header}>
            <Link href={'/'} className={styles.header__logo}>Epicurean</Link>
            <Searchbar />
            <Link href="/login" className={styles.header__auth}>Sign In</Link>
        </nav>
    )
}