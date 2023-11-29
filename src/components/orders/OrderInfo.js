import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCart, confirmOrder, createCustomer, hideModal, loginUser, showModal } from '../../actions/actions';
import { Button, Modal, TextField, Box } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400, // Hoặc bất kỳ độ rộng nào bạn muốn
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4, // Padding
};

const OrderInfo = () => {
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
    const handleCancel = () => {/* Logic to handle cancellation */ };
    const handleConfirm = () => {
        const orderDetails = {
            products: cart.items.map(item => ({
                product: item.id, // Assuming each item has a productId field
                quantity: item.quantity
            })),
            totalQuantity: cart.items.reduce((total, item) => total + item.quantity, 0),
            total: cart.total // Pass the total cost from the cart
        };
        console.log(orderDetails);
        dispatch(confirmOrder(orderDetails))
            .then(response => {
                // Assuming you have a state in the Redux store to track user login status
                if (!user.isLoggedIn) {
                    alert(`You are not logged in!`);
                    navigate('/login');
                    return;
                } else {
                    // Additional logic for logged-in users
                    setOrderConfirmation({ orderId: response.orderId, orderDate: response.orderDate });
                    dispatch(showModal());
                    dispatch(loginUser(user));
                }
            })
            .catch((error) => {
                // Handle any errors from the confirmOrder action
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
                dispatch(hideModal());
            })
            .catch(error => {
                // Handle any errors from the createCustomer action
                console.error('Error:', error);
                alert(error.message); // Display error message
            });
    };

    return (
        <div>
            <h2>Confirm Order</h2>
            {cart.items.map(item => (
                <div key={item.id}>{item.name} - {item.quantity}</div>
            ))}
            <div>Total: {cart.total}</div>
            <Button onClick={handleConfirm}>Confirm</Button>
            <Button onClick={handleCancel}>Cancel</Button>
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
                            <Button onClick={handleModalConfirm}>Confirm</Button>
                            <Button>Cancel</Button>
                        </Box>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default OrderInfo;