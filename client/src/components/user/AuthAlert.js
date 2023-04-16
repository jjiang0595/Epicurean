import styles from './AuthAlert.module.scss';
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {auth} from '../../store/firebaseConfig';
import {AuthContext} from "../../store/AuthContext";

const AuthAlert = (props) => {
    const [showAlert, setShowAlert] = useState(true);
    const [alertMessage, setAlertMessage] = useState(null);
    const [fade, setFade] = useState(false);
    const authCtx = useContext(AuthContext);
    const user = auth.currentUser;
    const router = useRouter();

    const hideAlert = () => {
        setFade(true);
        setTimeout(() => {
            setShowAlert(false);
            setFade(false);

        }, 500)
    }

    useEffect(() => {
            if (router.query.message !== undefined) {
                setAlertMessage(router.query.message);
                setShowAlert(true);
            } else {
                setShowAlert(false);
            }
        }, [authCtx.isLoggedIn, router.query.message]
    )

    return (
        <>
            {showAlert &&
                <div className={`${styles.alert} ${fade && styles.fadeout}`}>
                    <p className={styles.alert__text}>{alertMessage}</p>
                    <button className={styles.alert__x} onClick={hideAlert}>x</button>
                </div>}
        </>
    )
}

export default AuthAlert;