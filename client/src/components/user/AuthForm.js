import styles from './AuthForm.module.scss'
import {useRef, useState} from "react";


const AuthForm = (props) => {
    const [authType, setAuthType] = useState(true);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const authTypeHandler = type => () => {
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        setAuthType(type);
        console.log("PONG")
    }

    const submitHandler = async (event) => {

    }

    return (
        <div className={styles.container}>
            <div className={styles.authForm}>
                <div className={styles.authForm__header}>
                    {authType ?
                        <>
                            <h1 className={styles.authForm__header__text}>Log in</h1>
                            <div className={styles.authForm__header__authType}> Don't have an account?
                                <button className={styles.authForm__header__authType__button}
                                    onClick={authTypeHandler(false)}>Sign up
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
                <form onSubmit={submitHandler} className={styles.form}>
                    <div className={styles.control}>
                        <label>Email Address</label>
                        <input ref={emailInputRef} className={styles.control__input} type="email" id="email" required/>
                    </div>
                    <div className={styles.control}>
                        <label>Password</label>
                        <input ref={passwordInputRef} className={styles.control__input} type="password" id="password" required/>
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.actions__button}>{authType ? 'Sign In' : 'Register'}</button>
                    </div>
                </form>
            </div>
            <div className={styles.background}>
                <img className={styles.background__img} src="/food.jpg"   alt="breakfast background"/>
            </div>
        </div>
    )
}

export default AuthForm;