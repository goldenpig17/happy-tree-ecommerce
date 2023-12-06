import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCart, confirmOrder, createCustomer, hideModal, loginUser, showModal } from '../../actions/actions';
import { Button, Modal, TextField, Box, Paper, Typography } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4, // Padding
};

const OrderInfo = ({ onCancel }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);
    const isModalVisible = useSelector(state => state.modal.isModalVisible);

    const [customerInfo, setCustomerInfo] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        country: ''
    });

    const [orderConfirmation, setOrderConfirmation] = useState({ orderId: null, orderDate: null });


    //Hàm xử lý nút trên bảng
    const handleCancel = () => { if (onCancel) onCancel(); };
    const handleConfirm = () => {
        // Kiểm tra nếu giỏ hàng rỗng
        if (cart.items.length === 0) {
            alert("Giỏ hàng rỗng!");
            return; // Thoát khỏi hàm nếu giỏ hàng không có sản phẩm
        }

        const orderDetails = {
            products: cart.items.map(item => ({
                product: item.id,
                quantity: item.quantity
            })),
            totalQuantity: cart.items.reduce((total, item) => total + item.quantity, 0),
            total: cart.total
        };
        dispatch(confirmOrder(orderDetails))
            .then(response => {
                if (!user.isLoggedIn) {
                    alert(`Bạn chưa đăng nhập!`);
                    navigate('/login');
                    return;
                } else {
                    setOrderConfirmation({ orderId: response.orderId, orderDate: response.orderDate });
                    dispatch(showModal());
                    dispatch(loginUser(user));
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    };
    //Hàm xử lý đóng Modal
    const handleCloseModal = () => {
        dispatch(hideModal());
    };
    //Hàm xử lý trên Modal
    const handleInputChange = (e) => {
        setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
    };


    const handleModalConfirm = () => {
        // Check if all fields are filled
        if (Object.values(customerInfo).some(field => field === '')) {
            alert('Please fill in all fields');
            return;
        }
        // Include the order information with the customer details
        const customerData = {
            ...customerInfo,
            orders: [{
                orderId: orderConfirmation.orderId,
                orderDate: orderConfirmation.orderDate
            }]
        };
        dispatch(createCustomer(customerData))
            .then(data => {
                // Display a success message
                alert("Customer created successfully");;
                dispatch(clearCart());
                localStorage.removeItem('cart');
                dispatch(hideModal());
            })
            .catch(error => {
                // Handle any errors from the createCustomer action
                console.error('Error:', error);
                alert(error.message); // Display error message
            });
    };

    useEffect(() => {
        console.log("Cart updated:", cart);
    }, [cart]);

    // Font Style
    const customFontStyle = {
        fontFamily: "'Happy Monkey', sans-serif",
    };

    return (
        <div>
            <Box display="flex" justifyContent="flex-end" m={2}>
                <Paper sx={{ padding: 2, backgroundColor: '#fef7d0', boxShadow: 3 }}>
                    <Typography sx={{ ...customFontStyle, fontWeight: 'bold', fontSize: '2rem' }}>Xác nhận đơn hàng</Typography>
                    {cart.items.map(item => (
                        <div key={item.id}>{item.name} - {item.quantity}</div>
                    ))}
                    <div style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>Total: {cart.total}</div>
                    <Button variant="outlined" color="primary" onClick={handleConfirm} >Xác nhận</Button>
                    <Button variant="outlined" color="warning" onClick={handleCancel}>Hủy</Button>
                    <div>
                        {isModalVisible && (
                            <Modal
                                open={isModalVisible}
                                onClose={handleCloseModal}
                            >
                                <Box sx={modalStyle}>
                                    <h2>Nhập thông tin giao hàng</h2>
                                    <div>Order ID: {orderConfirmation.orderId}</div>
                                    <div>Order Date: {orderConfirmation.orderDate}</div>
                                    <TextField label="Full Name" name="fullName" onChange={handleInputChange} value={customerInfo.fullName} />
                                    <TextField label="Phone" name="phone" onChange={handleInputChange} value={customerInfo.phone} />
                                    <TextField label="Email" name="email" onChange={handleInputChange} value={customerInfo.email} />
                                    <TextField label="Address" name="address" onChange={handleInputChange} value={customerInfo.address} />
                                    <TextField label="City" name="city" onChange={handleInputChange} value={customerInfo.city} />
                                    <TextField label="Country" name="country" onChange={handleInputChange} value={customerInfo.country} />
                                    <br></br>
                                    <Button onClick={handleModalConfirm}>Xác nhận mua hàng</Button>
                                    <Button>Hủy mua hàng</Button>
                                </Box>
                            </Modal>
                        )}
                    </div>
                </Paper>
            </Box>
        </div>
    );
};

export default OrderInfo;