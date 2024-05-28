"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { app } from "../app/firebase/firebaseConfig"

// Create a context with an initial value
const AppContext = createContext(null)

export function Appwrapper({ children }) {
  // Use useState hook to manage state
  const [user, setUser] = useState(null)
  const auth = getAuth(app)
  const googleAuthProvider = new GoogleAuthProvider()

  // Sign in with email
  const signInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Redirect to a different page after successful sign-in
        window.location.href = "/afterlogin" // For client-side routing -> /afterlogin
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  // Popup sign-in with Google
  const signUpWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider).then((response) => {
      console.log(response.user)
      // Redirect to a different page after successful sign-in
      window.location.href = "/afterlogin" // For client-side routing
    })
  }

  // Logout function
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Redirect to a different page after successful sign-out
        window.location.href = "/" // For client-side routing
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [auth])

  // Provide the context value to the children
  return (
    <AppContext.Provider value={{ user, signInUser, signUpWithGoogle, logout }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
