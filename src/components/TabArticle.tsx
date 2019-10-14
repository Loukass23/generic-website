import React from 'react'
import { Theme, createStyles, Typography, Container, CardMedia, Grid } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import { type } from 'os';


interface Bock {

    title: string,
    text: string,
    img: string,
    sideImg: Boolean

}
type TabArticle = Array<Bock>

const styles = (theme: Theme) => createStyles({
    article: {
        position: 'relative',
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {

        },
    },
    text: {
        padding: theme.spacing(2),
    }
});

interface Props extends WithStyles<typeof styles> {
    classes: any,
    content: TabArticle
}


const TabArticle: React.FC<Props> = ({ classes, content }) => {

    return (
        <div>
            {
                content.map(block => (
                    block.sideImg ?
                        <Grid container spacing={2} className={classes.article} key={block.title}>
                            <Grid item xs={12} md={6}>
                                {block.img && <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    // height="140"
                                    image={block.img}
                                    title="Contemplative Reptile"
                                />}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography component="h3" variant="h5">
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
                                <Typography component="h3" variant="h5">
                                    {block.title}
                                </Typography>
                                {block.img && <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image={block.img}
                                    title="Contemplative Reptile"
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
