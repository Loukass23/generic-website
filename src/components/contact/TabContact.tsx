import React from 'react'
import { Theme, createStyles, Typography, CardMedia, Grid, Icon } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import ContactForm from './ContactForm';
import AddArticle from '../article/AddEditArticle';



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
    contact: Contact
}


const TabContact: React.FC<Props> = ({ classes, contact }) => {

    return (
        <div>

            <Grid container spacing={2} className={classes.article} >
                <Grid className={classes.gridImg} item xs={12}>
                    {/* {article.img &&
                                    <CardMedia
                                        component="img"
                                        alt="img"
                                        className={classes.sideImg}
                                        image={article.img}
                                        title="img"
                                    />} */}
                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.text} component="h3" variant="h5">
                        {contact.name}
                    </Typography>
                    <Typography className={classes.text} variant="body1" color="textSecondary">
                        {contact.phone}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(TabContact)
