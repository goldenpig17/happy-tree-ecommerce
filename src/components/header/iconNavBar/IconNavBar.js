import * as React from 'react';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useEffect } from 'react';

export default function IconNavBar() {
    const [cartItemCount, setCartItemCount] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Trạng thái đăng nhập
    const navigate = useNavigate();

    // Retrieve the cart data from local storage
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItemCount(cart.length);
    };

    useEffect(() => {
        updateCartCount();
        // Xử lý sự kiện cập nhật số lượng trên icon giỏ hàng
        window.addEventListener('cartUpdated', updateCartCount);

        // Kiểm tra trạng thái đăng nhập từ sessionStorage
        const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);

        // Xóa số trên icon giỏ hàng
        return () => {
            window.removeEventListener('cartUpdated', updateCartCount);
        };
    }, []);

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        sessionStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập khỏi sessionStorage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
        setIsLoggedIn(false); // Cập nhật trạng thái đăng nhập
        navigate("/"); // Chuyển hướng về trang chủ hoặc trang đăng nhập
        handleClose();
    };

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

    const handleAdmin = () => {
        navigate("/admin");
    };
    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="black"
                aria-label="menu"
                sx={{
                    mr: 2,
                    fontSize: '3rem',
                    '& .MuiSvgIcon-root': {
                        fontSize: '3rem'
                    }
                }}
            >
                <Tooltip title="Management Dashboard">
                    <SummarizeIcon onClick={handleAdmin} />
                </Tooltip>
                <Tooltip title="Account">
                    <AccountCircleIcon onClick={handleMenu} />
                </Tooltip>
                <Tooltip title="Cart">
                    <Badge badgeContent={cartItemCount} color="secondary">
                        <ShoppingCartIcon onClick={handleCart} />
                    </Badge>
                </Tooltip>
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
                {isLoggedIn ? (
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                ) : (
                    <>
                        <MenuItem onClick={handleSignUp}>Sign Up</MenuItem>
                        <MenuItem onClick={handleLogin}>Login</MenuItem>
                    </>
                )}
            </Menu>
        </div>

    );
}