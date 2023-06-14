import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const AuthContext = createContext(null)

const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [iconLoading, setIconLoading] = useState(false)

    console.log(user);

    // Firebase Signup
    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Firebase Signin
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // User Updated
    const updateUser = (name, photo) => {

        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    // Google Signin
    const googleProvider = new GoogleAuthProvider();
    const googleSignin = () => {

        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // Log Out Function
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // user ovserbation
    useEffect(() => {

        const unsubscriber = onAuthStateChanged(auth, currentUser => {

            setUser(currentUser)

            if (currentUser) {
                axios.post('https://click-crafters-server-jahidhowlader.vercel.app/jwt',
                    {
                        email: currentUser.email
                    })
                    .then(data => {
                        localStorage.setItem('access-token', data.data.token)
                        setLoading(false)
                    })
                    .catch(e => {
                        Swal.fire({
                            icon: 'error',
                            title: `<span >${e}</span>`,
                        })
                    })
            } else {
                localStorage.removeItem('access-token')
            }

            setLoading(false)
        })

        return () => {
            return unsubscriber
        }
    }, [])

    const authInfo = {
        user,
        loading,
        iconLoading,
        setLoading,
        setIconLoading,
        signUp,
        signIn,
        updateUser,
        googleSignin,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;