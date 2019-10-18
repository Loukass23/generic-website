import React, { useState, createContext } from 'react'
import { contentMaster } from '../content'


interface ContentContextInterface {
    content: Content,
    addArticle: any
}

interface Content {
    color: {
        primary: string,
        secondary: string
    },
    hero: {
        title: string,
        text: string,
        img: string,
        logo: string,
        parallax: Boolean
    },
    panel: Panel


    footer: {
        title: string,
        text: string,
        copyright: string

    },

}

const initContent: Content = contentMaster

const initContentContex: ContentContextInterface = {
    content: initContent,
    addArticle: () => {
        throw new Error('addArticle() not implemented');
    }
}

export const ContentContext = createContext<ContentContextInterface>({
    content: initContent,
    addArticle: () => {
        throw new Error('addArticle() not implemented');
    }
});

const ContentContextProvider = (props: { children: React.ReactNode; }) => {
    const [content, setContent] = useState(initContent)

    const addArticle = (tab: PanelTab) => {
        console.log('tab :', tab);
        // setContent({
        //     content
        // })
    }

    return (
        <ContentContext.Provider value={{ content, addArticle }}>
            {props.children}
        </ContentContext.Provider>
    )

}

export default ContentContextProvider


