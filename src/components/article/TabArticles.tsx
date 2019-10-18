import React, { useContext } from 'react'
import { Theme, createStyles, Typography, CardMedia, Grid, Tooltip, Fab, Button } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleSharp';
import { AuthContext } from '../../context/AuthContext';
import { ContentContext } from '../../context/ContentContext';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import AddEditArticle from './AddEditArticle';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';




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
    },
    absoluteR: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(2),
    },
    absoluteL: {
        position: 'absolute',
        top: theme.spacing(1),
        left: theme.spacing(2),
    },
    addIcon: {
        fontSize: 80,
        '&:hover': {
            color: theme.palette.secondary.main
        }
    },
    tabTitle: {
        margin: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
});

interface Props extends WithStyles<typeof styles> {
    classes: {
        article: string,
        text: string,
        title: string,
        sideImg: string,
        gridImg: string,
        absoluteL: string,
        absoluteR: string,
        addIcon: string,
        tabTitle: string,
        button: string

    },
    tab: PanelTab
}



const TabArticles: React.FC<Props> = ({ classes, tab }) => {
    const [editMode, toggleEditMode] = React.useState(true);
    const [addMode, toggleAddMode] = React.useState(false);
    const emptyArticle = {
        index: tab.articles.length + 1,
        title: '',
        text: '',
        img: '',
        sideImg: false

    }
    const { addEditArticle, article, setArticle } = useContext(ContentContext)

    // const [article, setAricle] = React.useState<Article>(emptyArticle)

    const { isAuthenticated } = useContext(AuthContext)

    const onEditClick = (article: Article) => {
        console.log('article', article)
        setArticle(article)
        toggleAddMode(true)
    }
    const onAddClick = () => {
        setArticle(emptyArticle)
        toggleAddMode(true)
    }
    const onEditCancel = () => {
        setArticle(emptyArticle)
        toggleAddMode(false)
    }
    const onClickSave = (tab: PanelTab, article: Article) => {
        addEditArticle(tab, article)
        onEditCancel()
    }


    if (addMode) return (
        <React.Fragment>
            <AddEditArticle />
            <Grid container>
                <Grid item xs={6}>
                    <Button
                        onClick={() => onEditCancel()}
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<CancelIcon />}
                    >
                        Cancel
      </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        onClick={() => onClickSave(tab, article)}
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Save
      </Button>
                </Grid>
            </Grid>
        </React.Fragment>)
    else return (
        <div>
            {tab.tabTitle &&
                <Typography className={classes.tabTitle} variant="h2" color="textSecondary">
                    {tab.tabTitle}
                </Typography>}
            {
                tab.articles.map(article =>
                    (
                        <React.Fragment key={article.index}>

                            {article.sideImg ?
                                <Grid container spacing={2} className={classes.article} >
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
                                        {editMode &&
                                            <React.Fragment>
                                                <Tooltip
                                                    // onClick={() => onEditClick(article)}
                                                    title="edit" aria-label="edit">
                                                    <Fab size="small" color="primary" className={classes.absoluteL} >
                                                        <UnfoldMoreIcon />
                                                    </Fab>
                                                </Tooltip>
                                                <Tooltip
                                                    onClick={() => onEditClick(article)}
                                                    title="edit" aria-label="edit">
                                                    <Fab size="small" color="primary" className={classes.absoluteR} >
                                                        <EditIcon />
                                                    </Fab>
                                                </Tooltip>
                                            </React.Fragment>
                                        }
                                        <Typography className={classes.text} component="h3" variant="h5">
                                            {article.title}
                                        </Typography>

                                        <Typography className={classes.text} variant="body1" color="textSecondary">
                                            {article.text}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container spacing={2} className={classes.article}>
                                    {editMode &&
                                        <React.Fragment>
                                            <Tooltip
                                                // onClick={() => onEditClick(article)}
                                                title="edit" aria-label="edit">
                                                <Fab size="small" color="primary" className={classes.absoluteL} >
                                                    <UnfoldMoreIcon />
                                                </Fab>
                                            </Tooltip>
                                            <Tooltip
                                                onClick={() => onEditClick(article)}
                                                title="edit" aria-label="edit">
                                                <Fab size="small" color="primary" className={classes.absoluteR} >
                                                    <EditIcon />
                                                </Fab>
                                            </Tooltip>
                                        </React.Fragment>
                                    }
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

                                </Grid>}
                        </React.Fragment>
                    ))


            }


            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <AddCircleOutlineIcon
                        onClick={() => onAddClick()}
                        className={classes.addIcon}
                        fontSize="large"
                        color="primary" />


                </Grid>

            </Grid>
        </div>
    )

}

export default withStyles(styles)(TabArticles)
