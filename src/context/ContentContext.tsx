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

    addEditDeleteArticle: () => {
        throw new Error('addEditDeleteArticle() not implemented');
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


    const [editMode, toggleEditMode] = React.useState(true);
    const [article, setArticle] = React.useState<Article>(emptyArticle)

    const editTabTitle = (panelTab: PanelTab, value: string, type: string) => {
        if (type === 'title') panelTab.tabTitle = value
        if (type === 'name') panelTab.tabName = value
        setContent({
            ...content,
        })
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


        }}>
            {props.children}
        </ContentContext.Provider>
    )

}

export default ContentContextProvider


