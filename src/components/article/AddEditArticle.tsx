import React, { useContext } from 'react';
import clsx from 'clsx';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Input, FormControlLabel, Switch, CardMedia, Grid } from '@material-ui/core';
import { ContentContext } from '../../context/ContentContext';

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },

    responsiveField: {
        width: '70vw',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginLeft: 0,
            marginRight: 0
        }
    },
    responsiveFieldSide: {
        width: '100%',
        marginTop: 0,
        marginBottom: 0,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginLeft: 0,
            marginRight: 0
        }
    },

    responsiveImg: {
        width: '70vw',
        margin: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        }
    },
    sideImg: {
        maxBlockSize: '50vh',


    },
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

})

interface Props extends WithStyles<typeof styles> {
    classes: any,
}

const AddEditArticle: React.FC<Props> = ({ classes }) => {


    const { article, setArticle } = useContext(ContentContext)

    const handleChange = (name: keyof Article) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setArticle({ ...article, [name]: event.target.value });
    };
    const toggleLayout = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setArticle({ ...article, sideImg: event.target.checked });
    };

    const { sideImg, title, text, img } = article
    return (
        <form className={classes.container} color="secondary" autoComplete="off">
            <Grid className={classes.gridImg} item xs={12} >
                <FormControlLabel
                    control={
                        <Switch checked={sideImg} value={sideImg} onChange={toggleLayout()} />
                    }
                    label="image and text side by side"
                />
            </Grid>
            {sideImg ?
                <Grid container spacing={1} className={classes.article} key={article.title}>

                    <Grid className={classes.gridImg} item xs={12} md={6}>
                        {img ?
                            <CardMedia
                                component="img"
                                alt="img"
                                className={classes.sideImg}
                                image={img}
                                title="img"
                            /> :
                            <Input

                                id="image-input"
                                // className={classes.responsiveField}
                                // accept="image/*"
                                type="file"
                            // multiple
                            // {...input}
                            // onChange={(e) => {
                            //     this.setState({ file: e.target.files[0], isUploading: true }, this.handleUpload)
                            // }} 
                            />}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            InputLabelProps={
                                classes.formLabelFocused
                            }
                            onChange={handleChange('title')}
                            required
                            id="filled-required"
                            label="Title"
                            defaultValue={title}
                            className={classes.responsiveFieldSide}

                            margin="normal"
                            variant="filled"
                        />


                        <TextField
                            color="secondary"
                            onChange={handleChange('text')}
                            id="filled-multiline-static"
                            label="Article"
                            multiline
                            rows="20"
                            defaultValue={text}
                            className={classes.responsiveFieldSide}
                            margin="normal"
                            variant="filled"
                        />
                    </Grid>
                </Grid> :
                <Grid container spacing={3} className={classes.article}>
                    <Grid item xs={12}>
                        <TextField
                            InputLabelProps={
                                classes.formLabelFocused
                            }
                            onChange={handleChange('title')}
                            required
                            id="filled-required"
                            label="Title"
                            defaultValue={title}
                            className={clsx(classes.responsiveField, classes.textField)}
                            margin="normal"
                            variant="filled"
                        />
                        <Grid item xs={12}>
                            {img ?

                                <CardMedia
                                    component="img"
                                    alt="img"
                                    height="140"
                                    image={article.img}
                                    title="img"
                                    className={clsx(classes.responsiveImg)}
                                /> :
                                <Input

                                    id="image-input"
                                    // className={classes}
                                    // accept="image/*"
                                    type="file"
                                // multiple
                                // {...input}
                                // onChange={(e) => {
                                //     this.setState({ file: e.target.files[0], isUploading: true }, this.handleUpload)
                                // }} 
                                />

                            }
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                color="secondary"
                                onChange={handleChange('text')}
                                id="filled-multiline-static"
                                label="Article"
                                multiline
                                rows="20"
                                defaultValue={text}
                                className={clsx(classes.responsiveField, classes.textField)}
                                margin="normal"
                                variant="filled"
                            />
                        </Grid>
                    </Grid>

                </Grid>}
        </form>
    );
}
export default withStyles(styles)(AddEditArticle)
