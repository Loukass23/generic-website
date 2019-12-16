import React, { useState, createContext } from 'react'
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from '../config/keys';


firebase.initializeApp(firebaseConfig);

const initUser: User = {
    name: 'Lucas',
    surname: 'DPS',
    avatar: 'https://res.cloudinary.com/ds3w3iwbk/image/upload/v1560349630/MERN/20170409_193026.jpg',
    isAdmin: false
}
const initAuth: AuthContextInterface = {
    isAuthenticated: false,
    user: initUser,
    logIn: () => {
        throw new Error('logIn() not implemented');
    },
}
export const AuthContext = createContext<AuthContextInterface>({
    isAuthenticated: false,
    user: initUser,
    logIn: () => {
        throw new Error('logIn() not implemented')
    }
})



const AuthContextProvider = (props: { children: React.ReactNode; }) => {
    const [auth, setAuth] = useState(initAuth)
    const [user, setUser] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false)


    const logIn = () => {
        console.log(firebase);
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {

                var user = result.user;
                console.log("You are logged in");
                console.log(user);
                if (user) setUser({
                    name: user.displayName,
                    avatar: user.photoURL,
                    isAdmin: true

                })
                setIsAuthenticated(true)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // const setUserAuth = (user: User) => {
    //     setAuth({
    //         isAuthenticated: true,
    //         user,

    //     })
    //}


    return (
        <AuthContext.Provider value={{ isAuthenticated, user, logIn }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContextProvider


