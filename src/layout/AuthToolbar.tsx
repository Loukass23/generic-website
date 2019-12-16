import React, { useContext } from 'react'
import { Toolbar, IconButton, Typography, Menu, MenuItem, Badge, AppBar, InputBase, Avatar } from '@material-ui/core'
import { AuthContext } from '../context/AuthContext';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, Theme, fade } from '@material-ui/core/styles';
import { WithStyles, withStyles } from '@material-ui/styles';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

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



const AuthToolbar: React.FC<Props> = ({ classes }) => {
    const { logIn, isAuthenticated, user } = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };



    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogIn = () => {
        setAnchorEl(null);
        logIn()
    };



    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <React.Fragment >
            {
                !isAuthenticated ?
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        id={menuId}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                    >

                        <MenuItem onClick={handleLogIn}>Log In</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Create Account(TBD)</MenuItem>
                    </Menu> :
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        id={menuId}
                        keepMounted
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Create Account(TBD)</MenuItem>
                    </Menu>
            }
        </React.Fragment>
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
                {!isAuthenticated ? <AccountCircle /> :
                    <React.Fragment>
                        {user.avatar ?
                            <Avatar alt="Remy Sharp" src={user.avatar} /> :
                            <Avatar>N</Avatar>}
                    </React.Fragment>
                }

            </IconButton>

            {renderMenu}
        </div >
    )
}

export default withStyles(styles)(AuthToolbar)
