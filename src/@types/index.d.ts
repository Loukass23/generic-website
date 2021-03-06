
/**
 * USER
 */
interface User {
    uid: string | null,
    name: string | null,
    surname?: string,
    avatar: string | null,
    isAdmin: Boolean
}
interface MaterialIcons {
    favorite: JSX.Element,
    home: JSX.Element,
    contact: JSX.Element,
    phone: JSX.Element,
    person: JSX.Element,
    flight: JSX.Element,
    house: JSX.Element,
    like: JSX.Element,
    dislike: JSX.Element,
    shop: JSX.Element,
    help: JSX.Element,
    add: JSX.Element,
    settings: JSX.Element,
}
/**
 * LAYOUT
 */
interface Footer {
    title: String,
    text: String,
    copyright: String,
}
interface Hero {
    title: String,
    text: String,
    img: string,
    logo: string,
    parallax: Boolean
}


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

interface Panel {
    tabs: PanelTabs
}

type PanelTabs = Array<any>

interface PanelTab {
    index: number,
    tabName: string,
    tabTitle: string,
    articles: Articles,
    tabType: string,
    icon: keyof MaterialIcons,
    contact: Contact,
    published: boolean
}

type Articles = Array<Article>

interface Article {
    index: number,
    title: string,
    text: string,
    img: string,
    sideImg: boolean

}
interface Contact {
    name: string,
    surname: string,
    phone: string,
    email: string,
    address: string
}


/**
 * CONTEXT
 */

interface AuthContextInterface {
    isAuthenticated: Boolean,
    user: User,
    logIn: any
}
interface ArticleContextInterface {
    content: Content,
    addEditDeleteArticle: any,
    article: Article,
    setArticle: any,
    changeArticleOrder: any,
    editTabTitle: any,
    tabTitle: string,
    setTabTitle: any
}
interface ContentContextInterface {
    content: Content,
    addEditDeleteArticle: any,
    article: Article,
    setArticle: any,
    changeArticleOrder: any,
    editTabTitle: any,
    editMode: boolean,
    toggleEditMode: any,
    addTab: any,
    changeTabOrder: any,
    deleteTab: any,
    setTabIcon: any,
    tooglePublished: any,
    firestorePush: any,
    setColorsContent: any
    firestorePull: any,
    firebaseStorageUpload: any


}

interface ThemeContextInterface {
    theme: any,
    setColors: any
}

interface TabContextInterface {
    tabs: PanelTabs,
    addEditDeleteArticle: any,
    article: Article,
    setArticle: any,
    changeArticleOrder: any,
    editTabTitle: any,
    tabTitle: string,
    setTabTitle: any
}


/**
 * CONTENT
 */
interface Content {
    color: {
        primary: string,
        secondary: string
    },
    hero: {
        display: boolean,
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
