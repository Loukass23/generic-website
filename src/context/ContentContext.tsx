import React, { useState, createContext, useContext, useReducer } from 'react'
import { contentMaster } from '../content'
import { addEditDeleteArticle, articlesReOrder } from '../reducers/ArticlesFunctions'
import { tabsReOrder, reIndexTabs } from '../reducers/TabFunctions'
// import { tabsReducer } from '../reducers/tabsReducers'
import * as firebase from "firebase/app";
import 'firebase/storage';
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
    },
    firebaseStorageUpload: () => {
        throw new Error('firebaseStorageUpload() not implemented');
    }
});

const ContentContextProvider = (props: { children: React.ReactNode; }) => {
    const [content, setContent] = useState(initContent)
    const { tabs } = content.panel
    const [editMode, toggleEditMode] = React.useState(true);
    const [article, setArticle] = React.useState<Article>(emptyArticle)
    // const [tabs, setTabs] = React.useState<PanelTabs>(content.panel.tabs)

    // const [tabs, dispatch] = useReducer(tabsReducer, [content.panel]);


    const { user } = useContext(AuthContext)
    const { setColors } = useContext(ThemeContext)

    const updateContent = () => {
        setContent({
            ...content,
        })
    }
    const editTabTitle = (panelTab: PanelTab, value: string, type: string) => {
        if (type === 'title') panelTab.tabTitle = value
        if (type === 'name') panelTab.tabName = value
        updateContent()
    }
    const addTab = () => {

        const newTab = {
            index: tabs.length,
            tabName: 'Tab Name (optional)',
            tabTitle: 'Tab Tible',
            articles: [],
            tabType: 'articles',
            icon: 'favorite',
            //contact: ''
        }
        tabs.push(newTab)
        reIndexTabs(tabs)
        updateContent()
        console.log('tabs :', tabs);

    }
    // const deleteTab = (tab: PanelTab) => {
    //     tabs.splice(tab.index, 1)
    //     setContent({
    //         ...content,
    //     })
    // }
    const setTabIcon = (currentTab: PanelTab, icon: MaterialIcons) => {
        var index = tabs.findIndex(tab => tab.index === currentTab.index);
        tabs[index].icon = icon
        updateContent()
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
    const deleteTab = (tabs: PanelTabs, tab: PanelTab) => {
        tabs.splice(tab.index, 1)
        reIndexTabs(tabs)
        updateContent()
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


    const firebaseStorageUpload = async (file: File) => {
        const storageService = firebase.storage();
        const storageRef = storageService.ref();


        // this.setState({ isUploading: true, progress: 0 })

        const uploadTask = storageRef.child(`article/${file.name}`).put(file); //create a child directory called images, and place the file inside this directory

        uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot)
            let prog = Math.round(snapshot.bytesTransferred * 100 / snapshot.totalBytes)
            // this.setState({ progress: prog });

        }, (error) => {

            console.log(error);
        }, () => {
            console.log('success');
            // this.setState({ isUploading: false, progress: 100 })
            firebase
                .storage()
                .ref("article")
                .child(`${file.name}`)
                .getDownloadURL()
                .then(url => setArticle({
                    ...article,
                    img: url

                }));

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
            setColorsContent,
            firestorePush,
            firestorePull,
            firebaseStorageUpload,
        }}>
            {props.children}
        </ContentContext.Provider>
    )

}

export default ContentContextProvider


