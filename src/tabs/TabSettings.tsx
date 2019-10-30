import React, { useContext } from 'react'
import AddTab from '../components/tab/AddTab'
import { withStyles, createStyles } from '@material-ui/styles'
import { Theme, Grid, IconButton, TextField, Tooltip, Fab, Menu, MenuItem, Select, Tab, Typography } from '@material-ui/core'
import { ContentContext } from '../context/ContentContext'
import { iconsRender, iconList } from '../components/Icons'
import HouseIcon from '@material-ui/icons/House';
import { SwatchesPicker } from 'react-color'
import { ThemeContext } from '../context/ThemeContext'

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    item: {
        justifyItems: 'center',
        justifyContent: 'center'

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

    const {
        colorPrimary,
        setColorPrimary,
        colorSecondary,
        setColorSecondary,
        content

    } = useContext(ContentContext)
    const { tabs } = content.panel
    const [addTabName, setAddTabName] = React.useState(false);
    const [tabName, setTabName] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleColorChangePrimary = (hex: string) => setColorPrimary(hex)
    const handleColorChangeSecondary = (hex: string) => setColorSecondary(hex)

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);

    };
    const menuId = 'primary-search-account-menu';

    const renderIconMenu = (tab: PanelTab) => (
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
    );
    console.log('themeComp', theme)


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
                            color={colorPrimary}
                            onChangeComplete={(color) => setColors(color.hex)}
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
                            color={colorSecondary}
                            onChangeComplete={(color) => setColors(color.hex)}
                        />
                    </div>
                </Grid>
            </Grid>

            <Typography variant="h4" color="textSecondary">
                Tabs
            </Typography>
            {
                tabs.map(tab => {
                    return (
                        <Grid container>
                            <Grid item xs={2}>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    {iconsRender(tab.icon)}
                                </IconButton>
                                {renderIconMenu(tab)}
                            </Grid>
                            <Grid item xs={8}>

                                < TextField
                                    fullWidth

                                    label="name (optional)"
                                    defaultValue={tab.tabName}
                                // onChange={(e) => setTabName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2}>

                            </Grid>
                        </Grid >)
                })
            }
            <AddTab />
        </div >
    )
}

export default withStyles(styles)(TabSettings)
