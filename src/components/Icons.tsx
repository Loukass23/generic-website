import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import HomeIcon from '@material-ui/icons/Home';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import HouseIcon from '@material-ui/icons/House';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';



export const iconsJSX: MaterialIcons = {
    favorite: <FavoriteIcon />,
    home: <HomeIcon />,
    contact: <PermContactCalendarIcon />,
    help: <HelpIcon />,
    phone: <PhoneIcon />,
    person: <PersonPinIcon />,
    flight: <FlightTakeoffIcon />,
    house: <HouseIcon />,
    like: <ThumbUp />,
    dislike: <ThumbDown />,
    shop: <ShoppingBasket />,
    add: <AddIcon />,
    settings: <SettingsIcon />

}


export const iconsRender = (icon: keyof MaterialIcons) => (iconsJSX[icon])

export const iconList = (Object.keys(iconsJSX) as (keyof MaterialIcons)[])