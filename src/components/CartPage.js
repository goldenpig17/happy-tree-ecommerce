import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity } from '../actions/actions';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const handleQuantityChange = (_id, increment) => {
        if (increment) {
            dispatch(updateQuantity(_id, true));
        } else {
            const product = cart.find(item => item._id === _id);
            if (product && product.quantity === 1) {
                handleRemove(_id);
            } else {
                dispatch(updateQuantity(_id, false));
            }
        }
    };

    const handleRemove = (_id) => {
        const updatedCart = cart.filter(item => item._id !== _id);
        dispatch({ type: 'REMOVE_ITEM', payload: updatedCart });
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Giỏ Hàng
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleQuantityChange(product._id, false)} disabled={product.quantity <= 1}>
                                        <RemoveIcon />
                                    </IconButton>
                                    {product.quantity}
                                    <IconButton onClick={() => handleQuantityChange(product._id, true)}>
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">${(product.price * product.quantity).toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleRemove(product._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="flex-end" m={2}>
                <Typography variant="h6">
                    Tổng Đơn Hàng: ${totalPrice}
                </Typography>
            </Box>
        </Box>
    );
};

export default CartPage;
