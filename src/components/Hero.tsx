import React from 'react'
import { createStyles, Theme, Paper, Grid, Typography, CssBaseline, CardMedia } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import { Parallax } from 'react-parallax';




const styles = (theme: Theme) => createStyles({
    root: {

    },
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
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    parallax: {
        color: theme.palette.common.white,
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
        alignItems: 'center',
    },
    logo: {
        width: '25vw',
        heigth: 'auto'
    },
    mainFeaturedPostContent: {
        color: theme.palette.common.white,

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
        parallax: string,
        root: string,
    }
    content: Hero
}

const RenderHero: React.FC<Props> = ({ classes, content }) => (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${content.img})` }}>
        <RenderHeroContent content={content} classes={classes} />
    </Paper>
)

const RenderParallax: React.FC<Props> = ({ classes, content }) => (
    <Parallax
        blur={1}
        bgImage={content.img}
        bgImageAlt="img"
        strength={500}
    >
        <div className={classes.parallax} />

        <RenderHeroContent content={content} classes={classes} />

    </Parallax >

)


const RenderHeroContent: React.FC<Props> = ({ classes, content }) => {
    return (
        <div>
            {/* Increase the priority of the hero background image */}
            {
                <img
                    style={{ display: 'none' }}
                    src={content.img}
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
                        image={content.logo}
                        title="logo"
                    />
                </Grid>
                <Grid item xs={8}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {content.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {content.text}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
        </div>
    )
}




const Hero: React.FC<Props> = ({ classes, content }) => {
    const { parallax } = content
    return (<div className={classes.root}>
        {parallax ?
            <RenderParallax content={content} classes={classes} /> :
            <RenderHero content={content} classes={classes} />
        }
    </div>)
}

export default withStyles(styles)(Hero) 
