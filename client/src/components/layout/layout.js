import styles from './layout.module.scss';
import MainNavigation from './MainNavigation';
function Layout(props) {
    return (
            <main className={styles.main}>
                <MainNavigation />
                {props.children}
            </main>
    );
}

export default Layout;