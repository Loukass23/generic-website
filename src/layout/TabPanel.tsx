import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createStyles, Theme, Container, TextField, Tooltip, Fab, Grid } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import TabArticle from '../components/article/TabArticles';
import SwipeableViews from 'react-swipeable-views';
import { iconsRender } from '../components/Icons';
import TabContact from '../components/contact/TabContact';
import { AuthContext } from '../context/AuthContext';
import AuthToolbar from './AuthToolbar';
import AddTab from '../components/tab/AddTab';
import { ContentContext } from '../context/ContentContext';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import TabSettings from '../tabs/TabSettings';




const TabPanel: React.FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            <Box style={{ padding: 0 }} p={3}>{children}</Box>
        </Typography>
    );
}



const a11yProps = (index: number) => {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}


const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    articleContainer: {
        overflow: 'hidden',
        padding: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            margin: 0,
        },
    },
});

interface Props extends WithStyles<typeof styles> {
    classes: {
        root: string,
        tabs: string,
        articleContainer: string,
    },
    panel: Panel,
}

const ScrollableTabsBar: React.FC<Props> = ({ classes, panel }) => {
    const [value, setValue] = React.useState(0);




    const {
        editMode,
        toggleEditMode,
        addTab,
        content

    } = useContext(ContentContext)
    const { tabs } = content.panel

    const {
        isAuthenticated

    } = useContext(AuthContext)

    const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
        setValue(newValue);
    };
    const handleChangeIndex = (index: number) => {
        setValue(index);
    };
    const renderTab = (tab: PanelTab) => {
        switch (tab.tabType) {
            case 'articles': return (
                <TabArticle tab={tab} />
            )
            case 'contact': return (<TabContact contact={tab.contact} />)
            case 'settings': return (<TabSettings />)
        }
    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.tabs} position="sticky">
                {/* <AuthToolbar /> */}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    aria-label="tabs"
                >
                    {tabs.map((tab, i) => {
                        if (isAuthenticated)
                            return (
                                <Tab key={tab.tabName} icon={iconsRender(tab.icon)} label={tab.tabName} {...a11yProps(i)} />
                            )
                        else if (tab.published) return (<Tab key={tab.tabName} icon={iconsRender(tab.icon)} label={tab.tabName} {...a11yProps(i)} />)

                    })
                    }
                </Tabs>
                {/* {editMode && 
                    // <AddTab />
                    // <React.Fragment>
                    //     {addTabName ?
                    //         <Grid>
                    //             <TextField
                    //                 // label="Tab Title"
                    //                 onChange={(e) => setTabName(e.target.value)}
                    //             />
                    //             <Tooltip
                    //                 onClick={() => {
                    //                     addTab(tabName)
                    //                     setAddTabName(false)
                    //                 }}
                    //                 title="edit" aria-label="edit">
                    //                 <Fab size="small" color="secondary" >
                    //                     <DoneIcon />
                    //                 </Fab>
                    //             </Tooltip>
                    //         </Grid>

                    //         :
                    //         <Grid >
                    //             <Tooltip
                    //                 onClick={() => setAddTabName(true)}
                    //                 title="add tab" aria-label="edit">
                    //                 <Fab size="small" color="secondary" >
                    //                     <AddIcon />
                    //                 </Fab>
                    //             </Tooltip>
                    //         </Grid>
                    //<Tab icon={iconsRender('add')} label="Add Tab" />
                    //     }
                    // </React.Fragment>
                }*/}
            </AppBar>
            <SwipeableViews
                axis='x'
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {tabs.map((tab, i) => (
                    <Container className={classes.articleContainer} key={tab.tabName} maxWidth="lg">
                        <TabPanel value={value} index={i}>
                            {renderTab(tab)}
                        </TabPanel>
                    </Container>
                ))
                }
            </SwipeableViews>
        </div >
    );

}
export default withStyles(styles)(ScrollableTabsBar)