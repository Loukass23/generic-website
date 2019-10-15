
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

interface TabArticles {
    tabs: Array<any>
}
interface Tab {
    tabName: string,
    tabTitle: string,
    article: Array<TabArticle>
}


type TabArticle = Array<Block>
interface Block {
    title: string,
    text: string,
    img: string,
    sideImg: Boolean

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