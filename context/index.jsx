"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { app } from "../app/firebase/firebaseConfig"


// Create a context with an initial value
const AppContext = createContext()

export function Appwrapper({ children }) {
  // Use useState hook to manage state
  const [user, setUser] = useState(null)
  const auth = getAuth(app)
  const googleAuthProvider = new GoogleAuthProvider()

  const signUpWithEmailAndPassword =(email, password)=>{
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Signed up 
      window.location.href = "/afterlogin"
      // ...
    })
    .catch((error) => {
      alert(error.message)
      console.log("kuch to glt hai ")
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
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
  // createUserWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // Signed up 
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });

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
    <AppContext.Provider value={{ user, signInUser, signUpWithGoogle, signUpWithEmailAndPassword, logout }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
