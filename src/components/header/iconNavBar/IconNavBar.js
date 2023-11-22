import * as React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useEffect } from 'react';

export default function IconNavBar() {
    const [cartItemCount, setCartItemCount] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();

    // Retrieve the cart data from local storage
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItemCount(cart.length);
    };

    useEffect(() => {
        updateCartCount();

        // Custom event listener for cart updates
        window.addEventListener('cartUpdated', updateCartCount);

        // Clean up the event listener
        return () => {
            window.removeEventListener('cartUpdated', updateCartCount);
        };
    }, []);

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

    const handleCart = () => {
        navigate("/cart");
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
                <Badge badgeContent={cartItemCount} color="secondary">
                    <ShoppingCartIcon onClick={handleCart} />
                </Badge>
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