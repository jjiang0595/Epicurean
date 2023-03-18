import styles from './MainNavigation.module.scss';
import Link from "next/link";

export default function MainNavigation() {
    return (
        <nav className={styles.header}>
            <Link href={'/'} className={styles.header__link}>
                <h1>Epicurean</h1>
            </Link>
            <Link href={'/recipes'} className={styles.header__link}>
                Leaderboard
            </Link>
            <button type="button" className={styles.header__link}>Login</button>
        </nav>
    )
}