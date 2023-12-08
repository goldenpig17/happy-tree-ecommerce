import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, updateCart, loginUser } from '../actions/actions';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Paper,
    Box,
    Typography,
    Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import OrderInfo from './orders/OrderInfo';
import BreadCrumb from './breadcrumbs/BreadCrumb';

const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    const [showOrderInfo, setShowOrderInfo] = useState(false);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);


    useEffect(() => {
        if (isLoggedIn === 'true') {
            // Lấy token từ sessionStorage
            const token = sessionStorage.getItem('token');
            // Dispatch hành động đăng nhập với token
            dispatch(loginUser({ token }));
        }
    }, [dispatch]);

    // Cập nhật giỏ hàng từ localStorage khi component được mount
    useEffect(() => {
        const cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
        dispatch(updateCart(cartFromStorage));
    }, [dispatch]);

    // Lắng nghe sự kiện cập nhật giỏ hàng từ các phần khác của ứng dụng
    useEffect(() => {
        const handleCartUpdate = () => {
            const cartFromStorage = JSON.parse(localStorage.getItem('cart')) || [];
            dispatch(updateCart(cartFromStorage));
        };

        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, [dispatch]);

    const handlePurchaseClick = () => {
        setShowOrderInfo(true);
    };

    const handleQuantityChange = (_id, increment) => {
        dispatch(updateQuantity(_id, increment));
    };

    const handleRemove = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        dispatch({ type: 'REMOVE_ITEM', payload: updatedCart });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleCancel = () => {
        setShowOrderInfo(false); // Đặt lại trạng thái để ẩn OrderInfo
    };

    //BreadCrumb
    const breadcrumbs = [
        {
            name: "Trang chủ",
            url: "/"
        },
        {
            name: "Danh sách sản phẩm",
            url: "/products"
        }
    ];

    // Font Style
    const customFontStyle = {
        fontFamily: "'Happy Monkey', sans-serif",
    };

    return (
        <Box sx={{ padding: 2 }}>
            <BreadCrumb breadcrumbs={breadcrumbs} />
            <Box sx={{ marginBottom: 3 }}>
                <Paper sx={{ padding: 2, backgroundColor: '#fef7d0', boxShadow: 3 }}>
                    <Typography variant="h3" gutterBottom component="div" sx={{ ...customFontStyle, fontWeight: 'bold', textAlign: 'center' }}>
                        Giỏ Hàng
                    </Typography>
                </Paper>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ ...customFontStyle, fontWeight: 'bold', fontSize: '1.4rem' }}>Sản phẩm</TableCell>
                            <TableCell align="right" style={{ ...customFontStyle, fontWeight: 'bold', fontSize: '1.4rem' }}>Giá</TableCell>
                            <TableCell align="right" style={{ ...customFontStyle, fontWeight: 'bold', fontSize: '1.4rem' }}>Số lượng</TableCell>
                            <TableCell align="right" style={{ ...customFontStyle, fontWeight: 'bold', fontSize: '1.4rem' }}>Tổng giá</TableCell>
                            <TableCell align="right" style={{ ...customFontStyle, fontWeight: 'bold', fontSize: '1.4rem' }}>Xóa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleQuantityChange(product.id, false)} disabled={product.quantity <= 1}>
                                        <RemoveIcon />
                                    </IconButton>
                                    {product.quantity}
                                    <IconButton onClick={() => handleQuantityChange(product.id, true)}>
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">${(product.price * product.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleRemove(product.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="flex-end" m={2}>
                <Paper sx={{ padding: 2, backgroundColor: '#fef7d0', boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom component="div" sx={{ ...customFontStyle }}>
                        Tổng Đơn Hàng: ${totalPrice}
                    </Typography>
                </Paper>
            </Box>
            <Box display="flex" justifyContent="flex-end" m={2}>
                <Button variant="contained" color="primary" onClick={handlePurchaseClick} sx={{ padding: 2, boxShadow: 3 }}>
                    Xác nhận giỏ hàng
                </Button>
            </Box>
            {showOrderInfo && <OrderInfo onCancel={handleCancel} />}
        </Box>
    );
};

export default CartPage;
