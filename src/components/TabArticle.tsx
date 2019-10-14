import React from 'react'
import { Theme, createStyles, Typography, CardMedia, Grid } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';



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
        gridImg: string
    },
    content: TabArticle
}


const TabArticle: React.FC<Props> = ({ classes, content }) => {

    return (
        <div>
            {
                content.map(block => (
                    block.sideImg ?
                        <Grid container spacing={2} className={classes.article} key={block.title}>
                            <Grid className={classes.gridImg} item xs={12} md={6}>
                                {block.img &&
                                    <CardMedia
                                        component="img"
                                        alt="img"
                                        className={classes.sideImg}
                                        image={block.img}
                                        title="img"
                                    />}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography className={classes.text} component="h3" variant="h5">
                                    {block.title}
                                </Typography>
                                <Typography className={classes.text} variant="body1" color="textSecondary">
                                    {block.text}
                                </Typography>
                            </Grid>
                        </Grid>
                        :
                        <Grid container spacing={2} className={classes.article} key={block.title}>
                            <Grid item xs={12}>
                                <Typography className={classes.title} component="h3" variant="h5">
                                    {block.title}
                                </Typography>
                                {block.img && <CardMedia
                                    component="img"
                                    alt="img"
                                    height="140"
                                    image={block.img}
                                    title="img"
                                />}
                                <Typography className={classes.text} variant="body1" color="textSecondary">
                                    {block.text}
                                </Typography>
                            </Grid>
                        </Grid>




                    // <Container className={classes.article} key={block.title}>
                    //     <Typography component="h3" variant="h5">
                    //         {block.title}
                    //     </Typography>
                    //     {block.img && <CardMedia
                    //         component="img"
                    //         alt="Contemplative Reptile"
                    //         height="140"
                    //         image={block.img}
                    //         title="Contemplative Reptile"
                    //     />}
                    //     <Typography variant="body1" color="textSecondary">
                    //         {block.text}
                    //     </Typography>
                    // </Container>

                ))

            }

        </div>
    )
}

export default withStyles(styles)(TabArticle)
