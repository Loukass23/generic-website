import React, { useState, createContext, useContext } from 'react'
import { contentMaster } from '../content'
import { addEditDeleteArticle, articlesReOrder } from './ArticlesFunctions'
import { ThemeContext } from './ThemeContext'

const initContent: Content = contentMaster
const emptyArticle = {
    index: 1,
    title: '',
    text: '',
    img: '',
    sideImg: true

}
export const ContentContext = createContext<ContentContextInterface>({
    content: initContent,
    article: emptyArticle,
    editMode: true,
    colorPrimary: '',

    colorSecondary: '',

    addEditDeleteArticle: () => {
        throw new Error('addEditDeleteArticle() not implemented');
    },
    setColorSecondary: () => {
        throw new Error('setColorSecondary() not implemented');
    },
    setColorPrimary: () => {
        throw new Error('setColorPrimary() not implemented');
    },
    setArticle: () => {
        throw new Error('setArticle() not implemented');
    },
    changeArticleOrder: () => {
        throw new Error('changeArticleOrder() not implemented');
    },
    editTabTitle: () => {
        throw new Error('editTabTitle() not implemented');
    },
    toggleEditMode: () => {
        throw new Error('toggleEditMode() not implemented');
    },
    addTab: () => {
        throw new Error('addTab() not implemented');
    }
});

const ContentContextProvider = (props: { children: React.ReactNode; }) => {
    const [content, setContent] = useState(initContent)

    const [colorPrimary, setTestColorPrimary] = useState(initContent.color.primary)
    const [colorSecondary, setColorSecondary] = useState(initContent.color.secondary)
    const [editMode, toggleEditMode] = React.useState(true);
    const [article, setArticle] = React.useState<Article>(emptyArticle)
    const {
        themeState,
        setTheme,

    } = useContext(ThemeContext)

    const setColorPrimary = (hex: string) => {
        setTestColorPrimary(hex)
        let { main } = themeState.palette.primary
        main = hex


        console.log('colorPrimary', colorPrimary)
        setTheme({
            ...themeState

        })
        console.log('content :', content);
    }

    const editTabTitle = (panelTab: PanelTab, tabTitle: string) => {
        panelTab.tabTitle = tabTitle
    }
    const addTab = (tabName: string) => {
        console.log('tabname :', tabName);
        const { tabs } = content.panel
        const newTab = {
            index: tabs.length,
            tabName,
            tabTitle: 'Tab Tible',
            articles: [],
            tabType: 'articles',
            icon: '',
            contact: ''
        }
        tabs.push(newTab)
        setContent({
            ...content,
        })
    }

    const changeArticleOrder = (panelTab: PanelTab, article: Article, action: string) => {
        articlesReOrder(panelTab, article, action)
        setContent({
            ...content,
        })
    }

    return (
        <ContentContext.Provider value={{
            editMode,
            toggleEditMode,
            content,
            addEditDeleteArticle,
            article,
            setArticle,
            changeArticleOrder,
            editTabTitle,
            addTab,
            colorPrimary,
            setColorPrimary,
            colorSecondary,
            setColorSecondary,

        }}>
            {props.children}
        </ContentContext.Provider>
    )

}

export default ContentContextProvider


