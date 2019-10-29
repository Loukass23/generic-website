import React, { useContext, useEffect } from 'react'
import { Grid, Tooltip, Fab, Typography, TextField, Theme } from '@material-ui/core'
import { withStyles, WithStyles, createStyles } from '@material-ui/styles'
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import { ContentContext } from '../context/ContentContext';


const styles = (theme: Theme) => createStyles({
    gridImg: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 0,
            marginBottom: 0
        },
    },
    absoluteR: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),

    },
    absoluteRTitle: {
        color: 'white',
        position: 'absolute',
        top: theme.spacing(0),
        right: theme.spacing(0),

    },
    tabTitle: {
        padding: 0,
        margin: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(2),
        },
        width: '100%',
        textAlign: 'center'
    },
})

interface Props extends WithStyles<typeof styles> {
    classes: any,
    editMode: boolean,
    tab: PanelTab
}

const TabTitle: React.FC<Props> = ({ classes, tab, editMode }) => {
    const {
        editTabTitle,
        content
    } = useContext(ContentContext)

    const [isEditTabTitle, setIsEditTabTitle] = React.useState<boolean>(false)

    const [title, setTitle] = React.useState<string>(tab.tabTitle)

    useEffect(() => {
        setTitle(tab.tabTitle)
    }, [tab.tabTitle])

    const handleEditTitle = (tab: PanelTab) => {
        editTabTitle(tab, title)
        setIsEditTabTitle(false)
    }

    // const handleCancelEditTitle = () => {
    //     setTabTitle(tab.tabTitle)
    //     setIsEditTabTitle(false)
    // };

    if (!isEditTabTitle) return (
        <Grid
            className={classes.gridImg}
            item xs={12}>
            {editMode &&
                <Tooltip
                    className={classes.absoluteR}
                    onClick={() => setIsEditTabTitle(true)}
                    title="edit" aria-label="edit">
                    <Fab size="small" color="primary" >
                        <EditIcon />
                    </Fab>
                </Tooltip>
            }
            {tab.tabTitle &&
                <Typography className={classes.tabTitle} variant="h3" color="textSecondary">
                    {tab.tabTitle}
                </Typography>}
        </Grid>)
    else return (<Grid
        style={{ width: '100' }}

        item xs={12}>
        <div className={classes.absoluteRTitle} >
            <Tooltip
                onClick={() => handleEditTitle(tab)}
                title="edit" aria-label="done">
                <Fab size="small" color="primary" >
                    <DoneIcon />
                </Fab>
            </Tooltip>
            {/* <Tooltip
                onClick={() => handleCancelEditTitle()}
                title="delete" aria-label="cancel">
                <Fab size="small" color="secondary"
                // className={classes.button}
                >
                    <CancelIcon />
                </Fab>
            </Tooltip> */}
        </div>
        <TextField
            className={classes.editTabTitle}
            onChange={(e) => setTitle(e.target.value)}
            id="filled-required"
            label="Title"
            defaultValue={tab.tabTitle}
            margin="normal"
            variant="filled"
            fullWidth={true}
        />
    </Grid>)
}

export default withStyles(styles)(TabTitle)

