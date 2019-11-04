import React, { useContext, useEffect } from 'react'
import { Grid, Tooltip, Fab, Typography, TextField, Theme, IconButton, Menu, MenuItem } from '@material-ui/core'
import { withStyles, WithStyles, createStyles } from '@material-ui/styles'
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import { ContentContext } from '../context/ContentContext';
import { iconsRender, iconList } from '../components/Icons';


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
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 0
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

const TabName: React.FC<Props> = ({ classes, tab, editMode }) => {
    const {
        editTabTitle,
        changeTabOrder,
        content
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
                color="secondary"
            >
                {iconsRender(tab.icon)}
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
                    // onClick={handleMenuClose}
                    >{iconsRender(icon)}</MenuItem>
                )
                }
            </Menu>
        </React.Fragment>
    );


    if (!isEditTabTitle) return (
        <Grid container spacing={2} className={classes.tab} >
            {renderEditMenu(tab)}
            {tab.tabName &&
                <Grid item xs={12} md={6}>
                    <Typography className={classes.tabTitle} variant="h6" color="textSecondary">
                        {tab.tabName}
                    </Typography>
                </Grid>}
            <Grid className={classes.gridImg} item xs={12} md={6}>

                {renderIconMenu(tab)}
                {/* <Grid
                className={classes.gridImg}
                item xs={12}> */}

                {/* {editMode &&

                // <div >

                //     <Tooltip
                //         className={classes.absoluteR}
                //         onClick={() => setIsEditTabTitle(true)}
                //         title="edit" aria-label="edit">
                //         <Fab size="small" color="primary" >
                //             <EditIcon />
                //         </Fab>
                //     </Tooltip>
                // </div>
            } */}
            </Grid>


        </Grid>)
    else return (
        <Grid container spacing={2} className={classes.tab} >
            {renderEditMenu(tab)}
            {renderIconMenu(tab)}
            <Grid item xs={12} md={6}>
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
            </Grid>
            <Grid item xs={12} md={6}>
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

