
export const addEditDeleteArticle = (panelTab: PanelTab, article: Article, action: string) => {
    const { articles } = panelTab
    var index = articles.findIndex(art => art.index === article.index);
    switch (action) {
        case 'edit': if (index !== -1) {
            articles.slice(0, index)
            articles[index] = article
            articles.slice(index + 1)
        }
        else {
            const lastIndex = articles.length + 1
            const updateArticle = { ...article, index: lastIndex }
            articles.push(updateArticle)
        }
            break
        case 'delete':
            articles.splice(index, 1)
            break
    }
    articles.forEach((art, i) => {
        articles.slice(0, i)
        articles[i] = {
            ...art,
            index: i
        }
        articles.slice(i + 1)
    })

    // setContent({
    //     ...content,
    // })
}