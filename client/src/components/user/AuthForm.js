import styles from './AuthForm.module.scss'
import {useEffect, useRef, useState} from "react";
import api from "../../utils/axiosConfig";
import {router} from "next/client";

const AuthForm = (props) => {
    const [authType, setAuthType] = useState(true);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    useEffect(() => {
        document.title = `Epicurean Sign-In`;
    })

    const authTypeHandler = type => () => {
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        setAuthType(type);
        console.log("PONG")
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const auth = authType ? 'login' : 'register';
        try {
            const response = await api.post(`/auth/${auth}`, {email, password}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = response.data; // Access response data from 'data' property
            // Handle response data as needed (e.g., check for authentication success, display error messages, etc.)
            if (data.status === "success") {
                await router.push('/')
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                        <input ref={passwordInputRef} className={styles.control__input} type="password" id="password"
                               required/>
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.actions__button}>{authType ? 'Sign In' : 'Register'}</button>
                    </div>
                </form>
            </div>
            <div className={styles.background}>
                <img className={styles.background__img} src="/food.jpg" alt="breakfast background"/>
            </div>
        </div>
    )
}

export default AuthForm;