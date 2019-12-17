import React, { useState, createContext, useContext } from 'react'
import { contentMaster } from '../content'
import { addEditDeleteArticle, articlesReOrder } from '../reducers/ArticlesFunctions'
import { tabsReOrder } from '../reducers/TabFunctions'
import * as firebase from "firebase/app";

import 'firebase/firestore';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';

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
    setColorsContent: () => {
        throw new Error('setColorsContent() not implemented');
    },
    firestorePush: () => {
        throw new Error('firestorePush() not implemented');

    },
    firestorePull: () => {
        throw new Error('firestorePush() not implemented');
    }
});

const ContentContextProvider = (props: { children: React.ReactNode; }) => {
    const [content, setContent] = useState(initContent)
    const { tabs } = content.panel
    const [editMode, toggleEditMode] = React.useState(true);
    const [article, setArticle] = React.useState<Article>(emptyArticle)
    const { user } = useContext(AuthContext)
    const { setColors } = useContext(ThemeContext)

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
    const setColorsContent = (hex: string, type: string) => {
        if (type === 'primary') content.color.primary = hex
        if (type === 'secondary') content.color.secondary = hex

        setColors(hex, type)
        setContent({
            ...content,
        })
    }
    const firestorePush = async () => {

        // Add a new document with a generated id.
        database.collection(`websites`).doc(`${user.uid}`).set(content)
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

    }
    const firestorePull = () => {

        database.collection(`websites`).doc(`${user.uid}`).get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data());
                const data = doc!.data()
                if (data) {
                    setContent({
                        color: data.color,
                        hero: data.hero,
                        panel: data.panel,
                        footer: data.footer
                    })
                    setUserTheme(data.color)
                }

            }
        })
            .catch(err => {
                console.log('Error getting document', err);
            });

    }
    const setUserTheme = (color: Content["color"]) => {
        setColors(color.primary, 'primary')
        setColors(color.secondary, 'secondary')
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
            setColorsContent,
            firestorePush,
            firestorePull
        }}>
            {props.children}
        </ContentContext.Provider>
    )

}

export default ContentContextProvider


