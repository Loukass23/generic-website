import React, { useContext, useEffect } from 'react'
import { Grid, Tooltip, Fab, Typography, TextField, Theme, IconButton, Menu, MenuItem, FormControlLabel, Switch } from '@material-ui/core'
import { withStyles, WithStyles, createStyles } from '@material-ui/styles'
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import { ContentContext } from '../context/ContentContext';
import { iconsRender, iconList } from '../components/Icons';
import red from '@material-ui/core/colors/red';



const styles = (theme: Theme) => createStyles({
    gridImg: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 0,
            marginBottom: 0
        },
    },
    tab: {
        position: 'relative',
        alignContent: 'center',
        justifyContent: 'center',
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingBottom: theme.spacing(4)
        },
    },
    absoluteR: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),

    },
    absoluteL: {
        position: 'absolute',
        top: theme.spacing(2),
        left: theme.spacing(2),

    },
    absoluteRTitle: {
        color: 'white',
        position: 'absolute',
        top: theme.spacing(0),
        right: theme.spacing(0),

    },
    tabTitle: {
        padding: 0,
        justifySelf: 'flex-start',
        // margin: theme.spacing(3),
        // [theme.breakpoints.down('xs')]: {
        //     padding: 0,
        //     marginLeft: 0,
        //     marginRight: 0,
        //     marginTop: theme.spacing(5),
        //     marginBottom: theme.spacing(2),
        // },
        // width: '100%',
        // textAlign: 'center'
    },
    buttonDel: {
        color: "white",
        backgroundColor: red[500],
    }

})

interface Props extends WithStyles<typeof styles> {
    classes: any,
    editMode: boolean,
    tab: PanelTab
}

const TabName: React.FC<Props> = ({ classes, tab, editMode }) => {
    const {
        editTabTitle,
        changeTabOrder,
        content,
        deleteTab,
        setTabIcon,
        tooglePublished
    } = useContext(ContentContext)

    const { tabs } = content.panel
    const [isEditTabTitle, setIsEditTabTitle] = React.useState<boolean>(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const [values, setValues] = React.useState()
    const isMenuOpen = Boolean(anchorEl);
    const [title, setTitle] = React.useState<string>(tab.tabTitle)

    useEffect(() => {
        setTitle(tab.tabTitle)
    }, [tab.tabTitle])

    const handleEditTitle = (tab: PanelTab) => {
        // editTabTitle(tab, title, 'title')
        editTabTitle(tab, title, 'name')

        setIsEditTabTitle(false)
    }

    // const handleCancelEditTitle = () => {
    //     setTabTitle(tab.tabTitle)
    //     setIsEditTabTitle(false)
    // };

    const menuId = 'primary-search-account-menu';

    const renderEditMenu = (tab: PanelTab) => (
        <React.Fragment>
            <div className={classes.absoluteL} >
                <Tooltip
                    onClick={() => changeTabOrder(tab, tabs, 'moveUp')}
                    title="moveUp" aria-label="moveDown">
                    <Fab size="small" color="primary"
                    // className={classes.absoluteL}
                    >
                        <KeyboardArrowUpIcon />
                    </Fab>
                </Tooltip>

                <Tooltip
                    onClick={() => changeTabOrder(tab, tabs, 'moveDown')}
                    title="moveDown" aria-label="move down">
                    <Fab size="small" color="primary"
                    // className={classes.absoluteL}
                    >
                        <KeyboardArrowDownIcon />
                    </Fab>
                </Tooltip>

            </div>
            <div className={classes.absoluteR} >

                <Tooltip
                    // className={classes.absoluteR}
                    placement="right-start"
                    onClick={() => setIsEditTabTitle(true)}
                    title="edit" aria-label="edit">
                    <Fab size="small" color="primary" >
                        <EditIcon />
                    </Fab>
                </Tooltip>
                <Tooltip
                    onClick={() => deleteTab(tabs, tab)}
                    title="delete" aria-label="delete">
                    <Fab size="small" color="primary"
                        className={classes.buttonDel}
                    >
                        <DeleteIcon />
                    </Fab>
                </Tooltip>
            </div>
        </React.Fragment>)

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const renderIconMenu = (tab: PanelTab) => (
        <React.Fragment>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="primary"
                size="medium"
            >
                {tab.icon ? iconsRender(tab.icon) :
                    iconsRender("add")}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            // defaultValue={tab.icon}
            >
                {iconList.map(icon =>
                    <MenuItem key={icon}
                        onClick={() => {
                            setTabIcon(tab, icon)
                            handleMenuClose()
                        }}
                    >{iconsRender(icon)}</MenuItem>
                )
                }
            </Menu>
        </React.Fragment>
    );

    if (!isEditTabTitle) return (

        <Grid container spacing={2} className={classes.tab} >
            {renderEditMenu(tab)}

            <Grid className={classes.gridImg} item xs={12} md={5}>

                <FormControlLabel
                    control={
                        <Switch checked={tab.published}
                            onChange={() => tooglePublished(tab)}
                        />
                    }
                    label="Published"
                />
            </Grid>
            <Grid item xs={12} md={1}>
                {renderIconMenu(tab)}
            </Grid>
            {tab.tabName &&

                <Grid item xs={12} md={3}>
                    <Typography className={classes.tabTitle} variant="h6" color="textSecondary">
                        {tab.tabName}
                    </Typography>
                </Grid>}
            {tab.tabType &&

                <Grid item xs={12} md={3}>
                    <Typography className={classes.tabTitle} variant="h6" color="textSecondary">
                        {tab.tabType}
                    </Typography>
                </Grid>}



        </Grid>)
    else return (
        <Grid container spacing={8} className={classes.tab} >
            {renderEditMenu(tab)}
            {/* <Grid item xs={6} md={2}>
                {renderIconMenu(tab)}
            </Grid> */}
            <Grid item xs={12} >
                <div className={classes.absoluteR} >
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
                    defaultValue={tab.tabName}
                    margin="normal"
                    variant="filled"
                    fullWidth={true}
                />
            </Grid>
        </Grid>)
}

export default withStyles(styles)(TabName)

