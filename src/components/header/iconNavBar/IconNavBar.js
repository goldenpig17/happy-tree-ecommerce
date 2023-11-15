import * as React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function IconNavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignUp = () => {
        // Logic để chuyển đến trang Sign Up
        navigate("/signup");
        handleClose();
    };

    const handleLogin = () => {
        // Logic để chuyển đến trang Login
        navigate("/login");
        handleClose();
    };

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="black"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <NotificationsIcon></NotificationsIcon>
                <AccountCircleIcon onClick={handleMenu}></AccountCircleIcon>
                <ShoppingCartIcon></ShoppingCartIcon>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleSignUp}>Sign Up</MenuItem>
                <MenuItem onClick={handleLogin}>Login</MenuItem>
            </Menu>
        </div>

    );
}