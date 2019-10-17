import React from 'react'
import { Theme, createStyles, Typography, CardMedia, Grid } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';




const styles = (theme: Theme) => createStyles({
    article: {
        position: 'relative',
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 0
        },
    },
    text: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingTop: 0,
        }
    },
    title: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingTop: theme.spacing(2),
        },

    },
    sideImg: {
        maxBlockSize: '50vh',


    },
    gridImg: {
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 0,
            marginBottom: 0
        },
    }
});

interface Props extends WithStyles<typeof styles> {
    classes: {
        article: string,
        text: string,
        title: string,
        sideImg: string,
        gridImg: string,

    },
    articles: Articles
}


const TabArticle: React.FC<Props> = ({ classes, articles }) => {

    return (
        <div>
            {
                articles.map(article => (
                    article.sideImg ?
                        <Grid container spacing={2} className={classes.article} key={article.title}>
                            <Grid className={classes.gridImg} item xs={12} md={6}>
                                {article.img &&
                                    <CardMedia
                                        component="img"
                                        alt="img"
                                        className={classes.sideImg}
                                        image={article.img}
                                        title="img"
                                    />}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography className={classes.text} component="h3" variant="h5">
                                    {article.title}
                                </Typography>
                                <Typography className={classes.text} variant="body1" color="textSecondary">
                                    {article.text}
                                </Typography>
                            </Grid>
                        </Grid>
                        :
                        <Grid container spacing={2} className={classes.article} key={article.title}>
                            <Grid item xs={12}>
                                <Typography className={classes.title} component="h3" variant="h5">
                                    {article.title}
                                </Typography>
                                {article.img && <CardMedia
                                    component="img"
                                    alt="img"
                                    height="140"
                                    image={article.img}
                                    title="img"
                                />}
                                <Typography className={classes.text} variant="body1" color="textSecondary">
                                    {article.text}
                                </Typography>
                            </Grid>
                            <Grid container spacing={2} >
                                <Grid item xs={12}>
                                    <AddCircleOutlineIcon
                                        fontSize="large"
                                        color="primary" />
                                </Grid>
                            </Grid>
                        </Grid>
                ))

            }


        </div>
    )
}

export default withStyles(styles)(TabArticle)
