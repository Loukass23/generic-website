import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, Theme } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';


interface Footer {
    title: String,
    text: String,
    copyright: String,
}



const styles = (theme: Theme) => createStyles({
    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(2),
        padding: theme.spacing(0),
        marginBottom: 0,
    },
    text: {
        padding: theme.spacing(0),
    }
});

interface Props extends WithStyles<typeof styles> {
    classes: any,
    content: Footer
}


const Footer: React.FC<Props> = ({ classes, content }) => {
    const { title, text, copyright } = content
    return (

        <footer
            className={classes.footer}
        >
            <CssBaseline />
            <Container maxWidth="lg">
                <Typography className={classes.text} color="primary" variant="h6" align="center" gutterBottom>
                    {title}
                </Typography>
                <Typography className={classes.text} variant="body1" align="center" color="textSecondary" component="p">
                    {text}
                </Typography>
                <Typography className={classes.text} variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="/">
                        {copyright}
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>

        </footer>
    )
}

export default withStyles(styles)(Footer);