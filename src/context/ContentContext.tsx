import React, { useState, createContext } from 'react'
import { contentMaster } from '../content'

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
    addEditArticle: () => {
        throw new Error('addEditArticle() not implemented');
    },
    setArticle: () => {
        throw new Error('addEditArticle() not implemented');
    }
});




const ContentContextProvider = (props: { children: React.ReactNode; }) => {
    const [content, setContent] = useState(initContent)
    const [article, setArticle] = React.useState<Article>(emptyArticle)

    const addEditArticle = (panelTab: PanelTab, article: Article) => {
        const { articles } = panelTab
        var index = articles.findIndex(art => art.index === article.index);
        console.log('index', index)
        if (index !== -1) {
            articles.slice(0, index)
            articles[index] = article
            articles.slice(index + 1)
        }
        else {
            const lastIndex = articles.length + 1
            const updateArticle = { ...article, index: lastIndex }
            console.log('updatedArticle', updateArticle)
            articles.push(updateArticle)
        }


        // if (index !== -1) {
        //     items[index] = 1010;
        // }
        // panelTab.articles.push(article)
        //  panelTab.articles.map(article) { return article == 3452 ? 1010 : item; });

        setContent({
            ...content,
        })
        console.log('art :', articles);
    }

    return (
        <ContentContext.Provider value={{ content, addEditArticle, article, setArticle }}>
            {props.children}
        </ContentContext.Provider>
    )

}

export default ContentContextProvider


