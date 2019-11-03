export const tabsReOrder = (selectedTab: PanelTab, tabs: PanelTabs, action: string) => {
    // const { articles } = panelTab
    var index = tabs.findIndex(tab => tab.index === selectedTab.index);
    switch (action) {
        case 'moveUp': if (index !== 0) {
            tabs.splice(index - 1, 2, tabs[index], tabs[index - 1]);
        }
            break
        case 'moveDown':
            if (index !== tabs.length - 1) {
                tabs.splice(index, 2, tabs[index + 1], tabs[index]);
            }
            break
    }

    reIndexArticles(tabs)
}

const reIndexArticles = (tabs: PanelTabs) => {
    tabs.forEach((tab, i) => {
        tabs.slice(0, i)
        tabs[i] = {
            ...tab,
            index: i
        }
        tabs.slice(i + 1)
    })
}