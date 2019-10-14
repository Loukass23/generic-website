
interface Hero {
    title: String,
    text: String,
    img: string,
    logo: string,
    parallax: Boolean
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

interface Footer {
    title: String,
    text: String,
    copyright: String,
}