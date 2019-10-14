
interface Hero {
    title: String,
    text: String,
    img: string,
    logo: string
}
interface TabArticles {
    tabs: Array<any>
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