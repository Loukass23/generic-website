import React, { useContext } from 'react'
import AddTab from '../components/tab/AddTab'
import { withStyles, createStyles } from '@material-ui/styles'
import { Theme, Grid, IconButton, TextField, Tooltip, Fab, Menu, MenuItem, Select, Tab, Typography, Divider, FormControlLabel, Switch } from '@material-ui/core'
import { ContentContext } from '../context/ContentContext'
import { iconsRender, iconList } from '../components/Icons'
import { SwatchesPicker } from 'react-color'
import { ThemeContext } from '../context/ThemeContext'
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import red from '@material-ui/core/colors/red';
import TabName from './TabName'


const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    article: {
        position: 'relative',
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 0
        },
    },
    item: {
        justifyItems: 'center',
        justifyContent: 'center'

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
    absoluteL: {
        position: 'absolute',
        top: theme.spacing(2),
        left: theme.spacing(2),
        '&:hover': {
            color: theme.palette.secondary.main
        }
    },
    addIcon: {
        fontSize: 80,
        '&:hover': {
            color: theme.palette.secondary.main
        }
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
    button: {
        margin: theme.spacing(1),
        color: "white"
    },
    buttonDel: {
        color: "white",
        backgroundColor: red[500],
    }

})

interface Props {
    classes: any
}

const TabSettings: React.FC<Props> = ({ classes }) => {

    const {
        setColors,
        theme
    } = useContext(ThemeContext)

    const { content, editTabTitle, editMode,
        toggleEditMode, } = useContext(ContentContext)
    const { tabs } = content.panel
    const [addTabName, setAddTabName] = React.useState(false);
    const [tabName, setTabName] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [values, setValues] = React.useState()
    const isMenuOpen = Boolean(anchorEl);

    const handleTabChange = (key: string, value: string) => {
        setValues({
            ...values,
            [key]: value
        })

    };

    // const handleMenuClose = () => {
    //     setAnchorEl(null);
    // };
    // const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);

    // };
    // const menuId = 'primary-search-account-menu';

    // const renderEditMenu = (tab: PanelTab) => (
    //     // <React.Fragment>
    //     <div className={classes.absoluteL} >
    //         <Tooltip
    //             onClick={() => changeTabOrder(tab, tabs, 'moveUp')}
    //             title="moveUp" aria-label="moveDown">
    //             <Fab size="small" color="primary"
    //             // className={classes.absoluteL}
    //             >
    //                 <KeyboardArrowUpIcon />
    //             </Fab>
    //         </Tooltip>
    //         <Tooltip
    //             onClick={() => changeTabOrder(tab, tabs, 'moveDown')}
    //             title="moveDown" aria-label="move down">
    //             <Fab size="small" color="primary"
    //             // className={classes.absoluteL}
    //             >
    //                 <KeyboardArrowDownIcon />
    //             </Fab>
    //         </Tooltip>
    //     </div>)
    /* <div className={classes.absoluteR} >
        <Tooltip
            onClick={() => handleEditTab(tab)}
            title="edit" aria-label="edit">
            <Fab size="small" color="primary" >
                <DoneIcon />
            </Fab>
        </Tooltip>
        <Tooltip
            // onClick={() => onClickDelete(tab, article)}
            title="delete" aria-label="delete">
            <Fab size="small" color="primary"
                className={classes.buttonDel}
            >
                <DeleteIcon />
            </Fab>
        </Tooltip>
    </div> */
    // </React.Fragment>
    // )
    // const renderMenu = (tab: PanelTab) => {
    //     let menuId = 'moveMenu' + tab.index;
    //     return (
    //         <Menu
    //             anchorEl={anchorEl}
    //             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //             id={menuId}
    //             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //             open={isMenuOpen}
    //             onClose={handleMenuClose}
    //         >
    //             <MenuItem
    //             // onClick={() => handleMoveUp(tab, art)}
    //             >Move up</MenuItem>
    //             <MenuItem
    //             // onClick={() => handleMoveDown(tab, art)}
    //             >Move down</MenuItem>
    //         </Menu>
    //     );
    // }
    // const renderIconMenu = (tab: PanelTab) => (
    //     <React.Fragment>
    //         <IconButton
    //             edge="end"
    //             aria-label="account of current user"
    //             aria-controls={menuId}
    //             aria-haspopup="true"
    //             onClick={handleProfileMenuOpen}
    //             color="secondary"
    //         >
    //             {iconsRender(tab.icon)}
    //         </IconButton>
    //         <Menu
    //             anchorEl={anchorEl}
    //             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //             id={menuId}
    //             keepMounted
    //             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //             open={isMenuOpen}
    //             onClose={handleMenuClose}
    //         // defaultValue={tab.icon}
    //         >
    //             {iconList.map(icon =>
    //                 <MenuItem key={icon}
    //                 // onClick={handleMenuClose}
    //                 >{iconsRender(icon)}</MenuItem>
    //             )
    //             }
    //         </Menu>
    //     </React.Fragment>
    // );

    // const validTabName = (tab: PanelTab) => {
    //     console.log('values :', values);
    //     // if (Object.keys(values)) {
    //     //     if (Object.keys(values).includes(tab.tabName)) {
    //     return (<Tooltip
    //         onClick={() => handleEditTab(tab)}
    //         title="edit" aria-label="done">
    //         <Fab size="small" color="primary" >
    //             <DoneIcon />
    //         </Fab>
    //     </Tooltip>)
    //     }
    // }
    // }
    const handleEditTab = (tab: PanelTab) => {
        let value = values[tab.tabName]
        editTabTitle(tab, value, 'name')

    }

    return (
        <div>
            <Typography variant="h3" color="textSecondary">
                Settings
            </Typography>



            <Typography variant="h4" color="textSecondary">
                Colors
            </Typography>
            <Grid container className={classes.container}>
                <Grid className={classes.item} item xs={12} md={6}>
                    <Typography variant="h6" color="textSecondary">
                        Primary
            </Typography>

                    <div
                        style={{
                            justifyContent: 'center',
                            display: 'flex',
                            margin: 0,
                        }}
                    >
                        <SwatchesPicker
                            color={content.color.primary}
                            onChangeComplete={(color) => setColors(color.hex, 'primary')}
                        />
                    </div>

                </Grid>

                <Grid item className={classes.item} xs={12} md={6}>
                    <Typography variant="h6" color="textSecondary">
                        Secondary
            </Typography>

                    <div
                        style={{
                            justifyContent: 'center',
                            display: 'flex',
                            margin: 0,
                        }}
                    >
                        <SwatchesPicker
                            color={content.color.secondary}
                            onChangeComplete={(color) => setColors(color.hex, 'secondary')}
                        />
                    </div>
                </Grid>
            </Grid>

            <Typography variant="h4" color="textSecondary">
                Tabs
            </Typography>
            {
                tabs.map(tab => {
                    if (tab.tabType !== 'settings') {
                        return (


                            <TabName key={tab.index} tab={tab} editMode={true} />

                        )
                    }



                    // {/* {renderEditMenu(tab)} */}

                    //     {/* <Grid item xs={4}> */}
                    //     {/* {renderEditMenu(tab)} */}
                    //     {/* <IconButton
                    //             edge="end"
                    //             aria-label="account of current user"
                    //             aria-controls={menuId}
                    //             aria-haspopup="true"
                    //             onClick={handleProfileMenuOpen}
                    //             color="secondary"
                    //         >
                    //             {iconsRender(tab.icon)}
                    //         </IconButton> */}
                    //     {/* {renderIconMenu(tab)} */}
                    //     {/* </Grid>
                    //     <Grid item xs={4}> */}
                    //     {/* <TabName tab={tab} editMode={true} /> */}
                    //     {/* <Typography className={classes.text} variant="body1" color="textSecondary">
                    //             {tab.tabName}
                    //         </Typography> */}
                    //     {/* < TextField
                    //             fullWidth
                    //             label="name (optional)"
                    //             defaultValue={tab.tabName}
                    //             onChange={(e) => handleTabChange(tab.tabName, e.target.value)}
                    //         /> */}
                    //     {/* </Grid> */}

                    //     {/* {validTabName(tab)} */}


                    //     {/* <Divider variant="middle" />
                    // </Grid >) */}
                })
            }

            <AddTab />


        </div >
    )
}

export default withStyles(styles)(TabSettings)
