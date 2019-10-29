import React, { useContext } from 'react'
import { Toolbar, IconButton, Typography, Menu, MenuItem, Badge, AppBar, InputBase } from '@material-ui/core'

import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, Theme, fade } from '@material-ui/core/styles';
import { WithStyles, withStyles } from '@material-ui/styles';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { iconList, iconsRender } from '../Icons';

interface Props extends WithStyles<typeof styles> {
    classes: any
    // {
    //     root: string,
    //     menuButton: string,
    //     title: string
    // }
}
const styles = (theme: Theme) => createStyles({
    root: {
        alignSelf: 'center',
        justifySelf: 'flex-end'
    },
    menuButton: {
        marginRight: theme.spacing(2),

    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

})



const AddTab: React.FC<Props> = ({ classes }) => {
    // const { isAuthenticated, user } = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };



    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    console.log('iconList :', iconList);

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {iconList.map(icon => {
                // console.log('icon :', icon);
                <MenuItem onClick={handleMenuClose}>{icon}</MenuItem>

            })
            }
            {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
        </Menu>
    );


    return (

        <div className={classes.root}>
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>

            {renderMenu}
        </div >
    )
}

export default withStyles(styles)(AddTab)

//     < React.Fragment >
//     {
//         addTabName?
//             <Grid>
//                                 < TextField
// // label="Tab Title"
// onChange = {(e) => setTabName(e.target.value)}
// />
//     < Tooltip
// onClick = {() => {
//     addTab(tabName)
//     setAddTabName(false)
// }}
// title = "edit" aria - label="edit" >
//     <Fab size="small" color="secondary" >
//         <DoneIcon />
//     </Fab>
//                                 </Tooltip >
//                             </Grid >

//                             :
// <Grid >
//     <Tooltip
//         onClick={() => setAddTabName(true)}
//         title="add tab" aria-label="edit">
//         <Fab size="small" color="secondary" >
//             <AddIcon />
//         </Fab>
//     </Tooltip>
// </Grid>
//                             // <Tab icon={iconsRender('add')} label="Add Tab" onClick={() => setAddTabName(true)} />
//                         }
//                     </React.Fragment >


// import React from 'react'
// import { iconList, iconsRender } from '../Icons'

// interface Props {
// }

// const AddTab: React.FC<Props> = () => {
//     console.log('iconList :', iconList);
//     return (
//         <div>
//             {iconList.map(icon => {
//                 console.log('icon :', icon);
//                 return iconsRender('add')
//             })
//             }

//         </div>
//     )
// }

// export default AddTab
