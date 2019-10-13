import React from 'react'
import { Container, Toolbar, Typography, Link } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';


interface Navbar {
    title: String,
    sections: Array<string>
}


const styles = (theme: Theme) => createStyles({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
});



interface Props extends WithStyles<typeof styles> {
    classes: any,
    content: Navbar
}

const Navbar: React.FC<Props> = ({ classes, content }) => {
    const { title, sections } = content
    return (
        <Container maxWidth="lg">

            {/* <Toolbar
                className={classes.toolbar}
            >
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    {title}
                </Typography>
            </Toolbar> */}
            <Toolbar component="nav" variant="dense"
                className={classes.toolbarSecondary}
            >
                {sections.map(section => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section}
                        variant="body2"
                        href="#"
                        className={classes.toolbarLink}
                    >
                        {section}
                    </Link>
                ))}
            </Toolbar>
        </Container>
    )
}

export default withStyles(styles)(Navbar) 
