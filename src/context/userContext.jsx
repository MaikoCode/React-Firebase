import { createContext, useState, useEffect } from "react"

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth"

import { auth } from "../firebase-config"



export const UserContext = createContext()

export function UserContextProvider(props){

    const [currentUser, setCurrentUser] = useState()
    const [loadingData, setLoadingData] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
            setLoadingData(false) // We're wainting data from firebase
        })
        return unsubscribe;
    }, [])

    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)


    const [modalState, setModalState] = useState({
        signUpModal: false,
        signInModal: false
    })

    const toggleModals = modal => {
        if(modal === "signUp"){
            setModalState({
                signUpModal: true,
                signInModal: false

            })
        }
        if(modal === "signIn"){
            setModalState({
                signUpModal: false,
                signInModal: true

            })
        }
        if(modal === "close"){
            setModalState({
                signUpModal: false,
                signInModal: false

            })
        }
    }

    return (
        <UserContext.Provider value={{modalState, toggleModals, signUp, currentUser, signIn}}>
            {!loadingData && props.children}
        </UserContext.Provider>
    )
}


