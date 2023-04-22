// authContext.js

import React, {createContext, useState, useEffect} from 'react';
import api from '../utils/axiosConfig';
import {useRouter} from 'next/router';
import {
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    setPersistence, signInWithEmailAndPassword,
    onIdTokenChanged
} from "firebase/auth";
import {auth} from "./firebaseConfig";
import AuthCodeMap from "../components/user/AuthCodeMap";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({children}) => {
        const [user, setUser] = useState(null);
        const router = useRouter();

        useEffect(() => {
            return (onIdTokenChanged(auth, (user) => {
                if (user) {
                    setUser(user.uid);
                }
            }))
        }, []);

        const handleAuth = async (authType, email, password) => {
            if (!email) {
                console.warn = () => {
                };
                router.push({
                    pathname: '/login',
                    query: {
                        message: 'Please enter an email address.',
                    },
                }, '/login');
                return;
            }
            if (!password) {
                console.warn = () => {
                };
                router.push({
                    pathname: '/login',
                    query: {
                        message: 'Please enter a password.',
                    },
                }, '/login');
                return;
            }
            if (!authType) {
                createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    onAuthStateChanged(auth, (user) => {
                        const uid = user.uid;
                        if (user) {
                            setUser(uid)
                        }
                    })
                }).catch((error) => {
                    const errorCode = error.code;
                    console.warn = () => {
                    };
                    router.push({
                        pathname: '/login',
                        query: {
                            message: AuthCodeMap(errorCode),
                        },
                    }, '/login');
                })
            } else {
                setPersistence(auth, browserSessionPersistence)
                    .then(() => {
                        return signInWithEmailAndPassword(auth, email, password);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        console.warn = () => {
                        };
                        router.push({
                            pathname: '/login',
                            query: {
                                message: AuthCodeMap(errorCode),
                            },
                        }, '/login');
                    })
            }

            router.push({
                pathname: '/',
                query: {
                    message: authType ? 'You have been logged in.' : 'You have been signed up.'
                }
            })
        };

        const handleLogout = async () => {
            auth.signOut().then(() => {
                setUser(null);
                router.push({
                    pathname: '/',
                    query: {
                        message: 'You have been logged out'
                    }
                }, '/');
            })
        }

        return (
            <AuthContext.Provider value={{user, handleAuth, handleLogout}}>
                {children}
            </AuthContext.Provider>
        );
    }
;
