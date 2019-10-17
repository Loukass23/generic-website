
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
    tabName: string,
    tabTitle: string,
    articles: Articles,
    tabType: string,
    icon: keyof MaterialIcons,
    contact: Contact
}

type Articles = Array<Article>

interface Article {
    title: string,
    text: string,
    img: string,
    sideImg: Boolean

}
interface Contact {
    name: string,
    surname: string,
    phone: string,
    email: string,
    address: string
}

interface User {
    name: string,
    surname: string,
    avatar: string,
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
}

interface Footer {
    title: String,
    text: String,
    copyright: String,
}