import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, Grid, Button, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField, Box, Typography } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [filterDate, setFilterDate] = useState(null);
    const [hasFiltered, setHasFiltered] = useState(false);

    // State Modal Thêm Order
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderFormData, setOrderFormData] = useState({
        orderDetails: [{
            productId: '',
            quantity: 1
        }],
        totalQuantity: 0,
        total: 0,
        order: {
            orderId: '', // Được sử dụng nếu bạn chọn một khách hàng hiện có
            fullName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            country: ''
        }
    });
    //State Modal Sửa Sản phẩm
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentEditOrder, setCurrentEditOrder] = useState(null);

    // Hàm xử lý mở Modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    //Hàm xử lý khi ấn Confirm trên Modal
    const handleConfirm = () => {
        // Đảm bảo tất cả trường thông tin đã được nhập
        if (Object.values(orderFormData).some(field => field === '')) {
            alert('Vui lòng nhập tất cả thông tin đơn hàng!');
            return;
        }

        // Gửi yêu cầu tới API để tạo đơn hàng
        fetch('http://localhost:8000/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderFormData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.message || 'Có lỗi xảy ra khi thêm đơn hàng');
                    });
                }
                return response.json();
            })
            .then(data => {
                // Xử lý phản hồi từ server
                alert(data.message);
                setIsModalOpen(false);
                // Cập nhật lại danh sách khách hàng
                fetchOrders();
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    }

    const fetchOrders = useCallback(async () => {
        // Nếu filterDate là null, đặt hasFiltered về false và lấy tất cả đơn hàng
        if (!filterDate) {
            setHasFiltered(false);
        }

        // Format the date to YYYY-MM-DD string for the query
        let dateString = '';
        if (filterDate) {
            // Chuyển đổi ngày sang định dạng YYYY-MM-DD mà không thay đổi múi giờ
            dateString = `${filterDate.getFullYear()}-${String(filterDate.getMonth() + 1).padStart(2, '0')}-${String(filterDate.getDate()).padStart(2, '0')}`;
        }

        const endpoint = dateString ? `date?date=${dateString}` : '';
        try {
            const response = await fetch(`http://localhost:8000/order/${endpoint}`);
            let data = await response.json();

            // Check if data.result exists, if not assume data is the array of orders
            if (data.result) {
                setOrders(data.result);
                setFilteredOrders(data.result);
            } else if (Array.isArray(data)) {
                setOrders(data);
                setFilteredOrders(data);
            } else {
                // If neither, log an error and set orders to an empty array
                console.error('Unexpected response format:', data);
                setOrders([]);
                setFilteredOrders([]);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders([]);
            setFilteredOrders([]);
        }
    }, [filterDate]);

    useEffect(() => {
        fetchOrders(); // Gọi fetchOrders ngay khi component được mount
    }, []); // Không cần phụ thuộc vào hasFiltered hoặc orders.length


    // Function to format a date to YYYY-MM-DD
    function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Hàm xử lý khi ấn nút Sửa và Xóa
    // Hàm để xử lý sự kiện khi nhấn nút Sửa
    const handleEdit = async (order) => {
        console.log(order);
        try {
            const orderDetailsResponse = await fetch(`http://localhost:8000/orderDetail/${order.orderDetails}`);
            const orderDetails = await orderDetailsResponse.json();
            console.log(orderDetails);

            const customerResponse = await fetch(`http://localhost:8000/customer/${order.customer}`);
            const customer = await customerResponse.json();
            console.log(customer);

            setCurrentEditOrder({
                ...order,
                orderDetails: orderDetails.result || [],
                customer: customer.result || []
            });
            setIsEditModalOpen(true);
        } catch (error) {
            console.error('Error fetching order details or customer:', error);
            alert('Failed to fetch order details or customer');
        }
    };
    //Hàm xử lý khi ấn nút Confirm trên Modal Sửa
    const handleUpdateConfirm = () => {
        fetch(`http://localhost:8000/order/${currentEditOrder._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentEditOrder)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Có lỗi xảy ra khi cập nhật khách hàng');
                }
                return response.json();
            })
            .then(data => {
                alert('Khách hàng đã được cập nhật thành công');
                setIsEditModalOpen(false);
                // Cập nhật lại danh sách sản phẩm
                fetchOrders();
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    };

    //Hàm xử lý khi ấn nút Xóa
    // Hàm để xử lý sự kiện khi nhấn nút Xóa
    const handleDelete = (orderId) => {
        // Kiểm tra xem khách hàng có order nào không
        fetch(`http://localhost:8000/order/${orderId}/orders`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Không thể kiểm tra order của khách hàng');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                // Nếu khách hàng có order, thông báo không thể xóa
                if (data.order.orders && data.order.orders.length > 0) {
                    alert('Khách hàng này có các order liên quan, không thể xóa!');
                } else {
                    // Nếu không có order, hỏi xác nhận trước khi xóa
                    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này không?")) {
                        return fetch(`http://localhost:8000/order/${orderId}`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                        });
                    } else {
                        throw new Error('Hủy bỏ thao tác xóa');
                    }
                }
            })
            .then(response => {
                if (response && !response.ok) {
                    throw new Error('Có lỗi xảy ra khi xóa khách hàng');
                }
                return response.json();
            })
            .then(() => {
                alert('Khách hàng đã được xóa thành công');
                fetchOrders();
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    };
    return (
        <div>
            {/* Nút mở Modal */}
            <Button onClick={handleOpenModal} variant="contained" color="success" style={{ margin: '10px' }}>
                Thêm Khách Hàng
            </Button>
            {/* Modal Thêm khách hàng*/}

            {/* Modal Sửa sản phẩm*/}
            {currentEditOrder && (
                <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                    <Box style={{ backgroundColor: 'white', padding: 20, margin: '20px auto', width: '50%' }}>
                        <Typography variant="h5">Edit Order - ID: {currentEditOrder._id}</Typography>
                        <Typography variant="h5">Order Date: {currentEditOrder.orderDate}</Typography>

                        {/* Hiển thị thông tin chi tiết của OrderDetails */}
                        <Grid container spacing={2}>
                            {/* Phần Edit Product */}
                            <Grid item xs={12} md={6}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">Edit Product:</Typography>
                                        {currentEditOrder.orderDetails.products.map((product, index) => (
                                            <Box key={product._id} mb={2}>
                                                <Typography variant="subtitle1">Product ID: {product.product}</Typography>
                                                <TextField
                                                    label="Quantity"
                                                    type="number"
                                                    value={product.quantity}
                                                    onChange={(e) => {
                                                        let newProducts = [...currentEditOrder.orderDetails.products];
                                                        newProducts[index].quantity = e.target.value;
                                                        setCurrentEditOrder({
                                                            ...currentEditOrder,
                                                            orderDetails: { ...currentEditOrder.orderDetails, products: newProducts }
                                                        });
                                                    }}
                                                    margin="normal"
                                                    fullWidth
                                                />
                                            </Box>
                                        ))}
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Phần Customer Information */}
                            <Grid item xs={12} md={6}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="subtitle1" style={{ marginTop: 20 }}>Customer Information</Typography>
                                        <TextField
                                            label="Full Name"
                                            value={currentEditOrder.customer.fullName}
                                            onChange={(e) => setCurrentEditOrder({
                                                ...currentEditOrder,
                                                customer: { ...currentEditOrder.customer, fullName: e.target.value }
                                            })}
                                            margin="normal"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Phone"
                                            value={currentEditOrder.customer.phone}
                                            onChange={(e) => setCurrentEditOrder({
                                                ...currentEditOrder,
                                                customer: { ...currentEditOrder.customer, phone: e.target.value }
                                            })}
                                            margin="normal"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Email"
                                            value={currentEditOrder.customer.email}
                                            onChange={(e) => setCurrentEditOrder({
                                                ...currentEditOrder,
                                                customer: { ...currentEditOrder.customer, email: e.target.value }
                                            })}
                                            margin="normal"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Address"
                                            value={currentEditOrder.customer.address}
                                            onChange={(e) => setCurrentEditOrder({
                                                ...currentEditOrder,
                                                customer: { ...currentEditOrder.customer, address: e.target.value }
                                            })}
                                            margin="normal"
                                            fullWidth
                                        />
                                        <TextField
                                            label="City"
                                            value={currentEditOrder.customer.city}
                                            onChange={(e) => setCurrentEditOrder({
                                                ...currentEditOrder,
                                                customer: { ...currentEditOrder.customer, city: e.target.value }
                                            })}
                                            margin="normal"
                                            fullWidth
                                        />
                                        <TextField
                                            label="Country"
                                            value={currentEditOrder.customer.country}
                                            onChange={(e) => setCurrentEditOrder({
                                                ...currentEditOrder,
                                                customer: { ...currentEditOrder.customer, country: e.target.value }
                                            })}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        {/* Thêm các trường khác để hiển thị thông tin khách hàng */}
                        <Box mt={3}>
                            <Button onClick={handleUpdateConfirm} color="primary">Update</Button>
                            <Button onClick={() => setIsEditModalOpen(false)} color="secondary">Cancel</Button>
                        </Box>
                    </Box>
                </Modal>
            )}
            {/* Thêm bộ lọc ngày */}
            <DatePicker
                selected={filterDate}
                onChange={(date) => {
                    setFilterDate(date);
                    if (!date) {
                        setHasFiltered(false);
                        fetchOrders();
                    }
                }}
            />
            <Button onClick={() => {
                setHasFiltered(true);
                fetchOrders();
            }} variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                Lọc
            </Button>
            {/* Bảng hiển thị danh sách đơn hàng */}
            <h2 style={{ textAlign: 'center' }}>
                Danh sách đơn hàng
            </h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>ID</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Ngày tạo đơn hàng</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Chi tiết đơn hàng</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Giá</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Khách hàng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(hasFiltered ? filteredOrders : orders).length > 0 ? (
                        (hasFiltered ? filteredOrders : orders).map(order => (
                            <TableRow key={order._id}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{formatDateToYYYYMMDD(new Date(order.orderDate))}</TableCell>
                                <TableCell>
                                    {order.orderDetails.map(detailId => (
                                        <div key={detailId}>
                                            OrderDetails ID: {detailId}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>{order.cost}</TableCell>
                                <TableCell>
                                    {order.customer ? `${order.customer}` : 'No Customer'}
                                </TableCell>
                                {/* Các cột khác */}
                                <TableCell>
                                    <Button onClick={() => handleEdit(order)} style={{ backgroundColor: 'green', color: 'white', borderRadius: '5px' }}>Sửa</Button>
                                    <Button onClick={() => handleDelete(order._id)} style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px' }}>Xóa</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6}>Không có đơn hàng nào.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrderTable;

