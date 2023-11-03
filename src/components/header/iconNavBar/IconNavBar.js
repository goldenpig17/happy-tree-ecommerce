import * as React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';


export default function IconNavBar() {
    return (
        <IconButton
            size="large"
            edge="start"
            color="black"
            aria-label="menu"
            sx={{ mr: 2 }}
        >
            <NotificationsIcon></NotificationsIcon>
            <AccountCircleIcon></AccountCircleIcon>
            <ShoppingCartIcon></ShoppingCartIcon>
        </IconButton>

    );
}