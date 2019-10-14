import React from 'react'
import { createStyles, Theme, Paper, Grid, Typography, CssBaseline, CardMedia } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';



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
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        // marginBottom: theme.spacing(1),
        // backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    hero: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        [theme.breakpoints.down('xs')]: {
            height: '100px'
        },
        // alignItems: 'center'
    },
    logo: {
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),

    },
});

interface Props extends WithStyles<typeof styles> {
    classes: {
        toolbar: string,
        toolbarTitle: string,
        toolbarSecondary: string,
        toolbarLink: string,
        mainFeaturedPost: string,
        overlay: string,
        hero: string,
        logo: string,
        mainFeaturedPostContent: string,
    }
    content: Hero
}

const Hero: React.FC<Props> = ({ classes, content }) => {
    const { title, text, img, logo } = content
    return (
        <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${img})` }}>
            {/* Increase the priority of the hero background image */}
            {
                <img
                    style={{ display: 'none' }}
                    src={img}
                    alt="background"
                />
            }
            <CssBaseline />

            <div className={classes.overlay} />
            <Grid container className={classes.hero}>
                <Grid item xs={2}>
                    <CardMedia
                        component="img"
                        alt="logo"
                        height="100%"
                        width="100%"
                        image={logo}
                        title="logo"
                    />
                </Grid>
                <Grid item xs={10}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {text}
                        </Typography>
                    </div>
                </Grid>
            </Grid>

        </Paper>
    )
}

export default withStyles(styles)(Hero) 
