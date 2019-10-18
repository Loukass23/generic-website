import React, { useState, createContext } from 'react'


const initUser: User = {
    name: 'Lucas',
    surname: 'DPS',
    avatar: 'https://res.cloudinary.com/ds3w3iwbk/image/upload/v1560349630/MERN/20170409_193026.jpg',
    isAdmin: true
}
const initAuth: AuthContextInterface = {
    isAuthenticated: false,
    user: initUser
}
export const AuthContext = createContext<AuthContextInterface>(initAuth);

const AuthContextProvider = (props: { children: React.ReactNode; }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: true,
        user: initUser
    })

    const setUserAuth = (user: User) => {
        setAuth({
            isAuthenticated: true,
            user
        })
    }

    return (
        <AuthContext.Provider value={auth}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider


