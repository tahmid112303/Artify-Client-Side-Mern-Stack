import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from './Firebase.init'
import { AuthContext } from './AuthContext'

const AuthProvider = ({children}) => {

    const provider = new GoogleAuthProvider()
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const [theme,setTheme] = useState("light")
    
    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const verifyEmail = (currentUser) => {
        return sendEmailVerification(currentUser)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth,email)
    }

    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth,provider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })

        return ()=>{
            unSubscribe()
        }
    },[])

        useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) setTheme(savedTheme);
      }, []);
    
        useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);;
        localStorage.setItem("theme", theme);
      }, [theme]);
    
      const changeTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
      }

    const userInfo = {
        createUser,
        signIn,
        verifyEmail,
        resetPassword,
        loginWithGoogle,
        logOut,
        user,
        loading,
        changeTheme,
        theme
    }

  return (
    <div>
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    </div>
  )
}

export default AuthProvider