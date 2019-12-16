import React, { useState, createContext } from 'react'
import { contentMaster } from '../content'
import { addEditDeleteArticle, articlesReOrder } from './ArticlesFunctions'
import { tabsReOrder } from './TabFunctions'
import * as firebase from "firebase/app";

import 'firebase/firestore';

// import { firebaseConfig } from '../config/keys';
var database = firebase.firestore()


// firebase.initializeApp(firebaseConfig);


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
    ,
    changeTabOrder: () => {
        throw new Error('changeTabOrder() not implemented');
    },
    deleteTab: () => {
        throw new Error('deleteTab() not implemented');
    },
    setTabIcon: () => {
        throw new Error('setTabIcon() not implemented');
    },
    tooglePublished: () => {
        throw new Error('tooglePublished() not implemented');
    },
    firestorePush: () => {
        throw new Error('firestorePush() not implemented');
    }
});

const ContentContextProvider = (props: { children: React.ReactNode; }) => {
    const [content, setContent] = useState(initContent)
    const { tabs } = content.panel
    const [editMode, toggleEditMode] = React.useState(true);
    const [article, setArticle] = React.useState<Article>(emptyArticle)

    const editTabTitle = (panelTab: PanelTab, value: string, type: string) => {
        if (type === 'title') panelTab.tabTitle = value
        if (type === 'name') panelTab.tabName = value
        setContent({
            ...content,
        })
    }
    const addTab = () => {

        const newTab = {
            index: tabs.length,
            tabName: '',
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
    const deleteTab = (tab: PanelTab) => {
        tabs.splice(tab.index, 1)
        setContent({
            ...content,
        })
    }
    const setTabIcon = (currentTab: PanelTab, icon: MaterialIcons) => {
        var index = tabs.findIndex(tab => tab.index === currentTab.index);
        tabs[index].icon = icon
        setContent({
            ...content,
        })
    }
    const tooglePublished = (currentTab: PanelTab) => {
        var index = tabs.findIndex(tab => tab.index === currentTab.index);
        tabs[index].published = !currentTab.published
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
    const changeTabOrder = (panelTab: PanelTab, tabs: PanelTabs, action: string) => {
        tabsReOrder(panelTab, tabs, action)
        setContent({
            ...content,
        })
    }
    const firestorePush = () => {

        // Add a new document with a generated id.
        database.collection("content").add(content)
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

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
            changeTabOrder,
            deleteTab,
            setTabIcon,
            tooglePublished,
            firestorePush
        }}>
            {props.children}
        </ContentContext.Provider>
    )

}

export default ContentContextProvider


