import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createStyles, Theme, Container } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import TabArticle from '../components/TabArticle';
import Article from '../components/TabArticle';

interface TabArticles {
    tabs: Array<any>
}


const TabPanel = (props: { [x: string]: any; children: any; value: any; index: any; }) => {
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
            <Box p={3}>{children}</Box>
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
        justifyContent: 'center'
    }
});

interface Props extends WithStyles<typeof styles> {
    classes: any,
    content: TabArticles
}

const ScrollableTabsBar: React.FC<Props> = ({ classes, content }) => {
    const [value, setValue] = React.useState(0);
    const { tabs } = content

    const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.tabs} position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    aria-label="tabs"
                >
                    {tabs.map((tab, i) => (
                        <Tab key={tab.tabName} label={tab.tabName} {...a11yProps(i)} />
                    ))
                    }
                </Tabs>
            </AppBar>

            {tabs.map((tab, i) => (
                <Container key={tab.tabName} maxWidth="lg">
                    <TabPanel value={value} index={i}>
                        <TabArticle content={tab.article} />
                    </TabPanel>
                </Container>

            ))
            }

        </div>
    );

}
export default withStyles(styles)(ScrollableTabsBar)