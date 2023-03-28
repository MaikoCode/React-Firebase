import { createContext, useState, useEffect } from "react"



export const UserContext = createContext()

export function UserContextProvider(props){

    const [modalState, setModalState] = useState({
        signUpModal: true,
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
        <UserContext.Provider value={{modalState, toggleModals}}>
            {props.children}
        </UserContext.Provider>
    )
}


