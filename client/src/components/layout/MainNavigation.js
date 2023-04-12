import styles from './MainNavigation.module.scss';
import Link from "next/link";
import Searchbar from "./Searchbar";

export default function MainNavigation() {
    return (
        <nav className={styles.header}>
            <Link href={'/'} className={styles.header__link}>
                <h1>Epicurean</h1>
            </Link>
            <Searchbar />
            <button type="button" className={styles.header__link}>Login</button>
        </nav>
    )
}