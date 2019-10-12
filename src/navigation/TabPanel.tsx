import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createStyles, Theme, Container } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';

interface Navbar {
    title: String,
    sections: Array<string>
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
    content: Navbar
}

const ScrollableTabsButtonPrevent: React.FC<Props> = ({ classes, content }) => {
    const [value, setValue] = React.useState(0);
    const { sections } = content

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
                    {sections.map((section, i) => (
                        <Tab key={section} label={section} {...a11yProps(i)} />
                    ))
                    }
                </Tabs>
            </AppBar>

            {sections.map((section, i) => (
                <Container maxWidth="lg">
                    <TabPanel key={section} value={value} index={i}>
                        {section}
                    </TabPanel>
                </Container>

            ))
            }

        </div>
    );

}
export default withStyles(styles)(ScrollableTabsButtonPrevent)