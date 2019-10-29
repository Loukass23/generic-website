
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

    reIndexArticles(articles)
}

export const articlesReOrder = (panelTab: PanelTab, article: Article, action: string) => {
    const { articles } = panelTab
    var index = articles.findIndex(art => art.index === article.index);
    switch (action) {
        case 'moveUp': if (index !== 0) {
            articles.splice(index - 1, 2, articles[index], articles[index - 1]);
        }
            break
        case 'moveDown':
            if (index !== articles.length - 1) {
                articles.splice(index, 2, articles[index + 1], articles[index]);
            }
            break
    }

    reIndexArticles(articles)
}

const reIndexArticles = (articles: Articles) => {
    articles.forEach((art, i) => {
        articles.slice(0, i)
        articles[i] = {
            ...art,
            index: i
        }
        articles.slice(i + 1)
    })
}