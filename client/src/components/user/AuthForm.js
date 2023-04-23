import styles from './AuthForm.module.scss'
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useContext} from "react";
import {AuthContext} from "../../store/AuthContext";
import ErrorAlert from "./ErrorAlert";

const AuthForm = (props) => {
    const authContext = useContext(AuthContext);

    const [authType, setAuthType] = useState(true);
    const [showImage, setShowImage] = useState(true);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    useEffect(() => {
        document.title = authType ? 'Login | Epicurean' : 'Sign Up | Epicurean';
    }, [authType])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1200px)');
        const handleMediaQueryChange = (e, mediaQuery) => {
            setShowImage(!e.matches);
        }

        handleMediaQueryChange(mediaQuery)
        mediaQuery.addEventListener('change', (e) => handleMediaQueryChange(e, mediaQuery));
    }, []);

    const authTypeHandler = type => () => {
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        setAuthType(type);
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        await authContext.handleAuth(authType, emailInputRef.current.value, passwordInputRef.current.value);
    }

    return (
        <div className={styles.container}>
            <div
                className={`${styles.authForm} ${!showImage && styles.authForm__mobile}`}>
                <ErrorAlert/>

                <div className={styles.authForm__header}>
                    {authType ?
                        <>
                            <h1 className={styles.authForm__header__text}>Log in</h1>
                            <div className={styles.authForm__header__authType}> Need an Epicurean account?
                                <button className={styles.authForm__header__authType__button}
                                        onClick={authTypeHandler(false)}>Create an account
                                </button>
                            </div>
                        </>
                        :
                        <>
                            <h1 className={styles.authForm__header__text}>Sign up to Epicurean</h1>
                            <div className={styles.authForm__header__authType}>Already have an account?
                                <button className={styles.authForm__header__authType__button}
                                        onClick={authTypeHandler(true)}>Login
                                </button>
                            </div>
                        </>}
                </div>
                <form onSubmit={submitHandler}>
                    <div className={styles.control}>
                        <label className={styles.control__label}>Email Address</label>
                        <input ref={emailInputRef}
                               className={`${styles.control__input} ${!showImage && styles.control__input__mobile}`}
                               type="email" id="email"/>
                    </div>
                    <div className={styles.control}>
                        <label className={styles.control__label}>Password</label>
                        <input ref={passwordInputRef}
                               className={`${styles.control__input} ${!showImage && styles.control__input__mobile}`}
                               type="password" id="password"
                        />
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.actions__button}>{authType ? 'Sign In' : 'Register'}</button>
                    </div>
                </form>
            </div>
            {showImage && <div className={styles.background}>
                <img className={styles.background__img} src="/food.jpg" alt="breakfast background" preload="true"/>
            </div>}
        </div>
    )
}

export default AuthForm;