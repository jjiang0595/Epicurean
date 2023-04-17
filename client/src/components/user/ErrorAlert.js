import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from './ErrorAlert.module.scss';

const AuthAlert = () => {
    const [showAlert, setShowAlert] = useState(false);
    const router = useRouter();

    const hideAlert = () => {
        setShowAlert(false);
    }

    useEffect(() => {
        if (router.query.message !== undefined) {
            setShowAlert(true);
        } else {
            hideAlert();
        }
    }, [router.query.message])

    return (
        <>
            {showAlert &&
                <div className={`${styles.alert}`} >
                    <svg className={styles.alert__icon}>
                        <use href="/sprite.svg#icon-cancel"></use>
                    </svg>
                    <p className={styles.alert__text}>{router.query.message}</p>
                </div>}
        </>
    )
}

export default AuthAlert;