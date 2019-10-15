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



const iconsJSX: MaterialIcons = {
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

}

export const iconsRender = (icon: keyof MaterialIcons) => {
    console.log('icon', icon)
    return (iconsJSX[icon])

}