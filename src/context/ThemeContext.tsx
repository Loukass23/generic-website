import React, { useState, createContext } from 'react'
import theme from '../theme'
import { any } from 'prop-types';



export const ThemeContext = createContext<ThemeContextInterface>({
    themeState: theme,
    setTheme: () => {

        throw new Error('setTheme() not implemented');
    },
});

const ThemeContextProvider = (props: { children: React.ReactNode; }) => {
    const [themeState, setTheme] = useState(theme)


    return (
        <ThemeContext.Provider value={{
            themeState,
            setTheme

        }}>
            {props.children}
        </ThemeContext.Provider>
    )

}

export default ThemeContextProvider


