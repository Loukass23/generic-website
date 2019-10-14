import React from 'react'
import { createStyles, Theme, Paper, Grid, Typography, CssBaseline, CardMedia } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import { Parallax } from 'react-parallax';




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
        parallax: string
    }
    content: Hero
}

const RenderHero: React.FC<Props> = ({ classes, content }) => (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${content.img})` }}>
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
                <img src={content.logo} className={classes.logo} alt="" />
                {/* 
                <CardMedia
                    component="img"
                    alt="logo"
                    // height="100vh"
                    // width="auto"
                    image={content.logo}
                    title="logo"
                /> */}
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

        {/* <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${img})` }}> */}
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
                <img src={content.logo} alt="" />
                {/* <CardMedia
                    component="img"
                    alt="logo"
                    image={content.logo}
                    title="logo"
                /> */}
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

        {/* </Paper> */}
    </Parallax >

)




const Hero: React.FC<Props> = ({ classes, content }) => {
    const { parallax } = content
    if (parallax)
        return (<RenderParallax content={content} classes={classes} />)
    else return (<RenderHero content={content} classes={classes} />)
}

export default withStyles(styles)(Hero) 
