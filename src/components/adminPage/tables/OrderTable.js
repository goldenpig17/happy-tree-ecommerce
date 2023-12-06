import React, { useEffect, useState, useCallback } from "react";
import { MenuItem, Card, CardContent, Grid, Button, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField, Box, Typography } from '@mui/material';
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
        orderDetails: {
            products: [{
                productId: '',
                quantity: 1
            }],
            totalQuantity: 0,
            total: 0
        },
        order: {
            orderDate: new Date().toISOString().split('T')[0], // Format ngày hiện tại thành YYYY-MM-DD
            cost: 0
        },
        customer: {
            fullName: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            country: ''
        }
    });
    //State để lưu danh sách sản phẩm
    const [products, setProducts] = useState([]);
    //State Modal Sửa Sản phẩm
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentEditOrder, setCurrentEditOrder] = useState(null);

    // Hàm xử lý mở Modal Thêm
    const handleOpenModal = () => {
        // Đặt giá trị mặc định cho orderDate và cost khi mở Modal
        setOrderFormData({
            ...orderFormData,
            order: {
                ...orderFormData.order,
                orderDate: new Date().toISOString().split('T')[0], // Ngày hiện tại
                cost: 0 // Cost mặc định
            }
        });
        setIsModalOpen(true);
    };
    //Hàm xử lý khi ấn Confirm trên Modal Thêm
    const handleConfirm = async () => {
        try {
            // Tạo orderDetails mới
            const orderDetailsResponse = await fetch('http://localhost:8000/orderDetail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderFormData.orderDetails)
            });
            const orderDetailsData = await orderDetailsResponse.json();

            // Tạo customer mới
            const customerResponse = await fetch('http://localhost:8000/customer/customerTable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderFormData.customer)
            });
            const customerData = await customerResponse.json();

            // Tạo order mới với orderDetailsId và customerId mới tạo
            await fetch('http://localhost:8000/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderDate: orderFormData.order.orderDate,
                    orderDetails: orderDetailsData.result._id,
                    cost: orderFormData.order.cost,
                    customer: customerData.customer._id
                })
            });
            // Xử lý phản hồi và cập nhật UI
            alert("Đơn hàng đã được thêm thành công!");
            fetchOrders();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error:', error);
            alert("Có lỗi xảy ra khi thêm đơn hàng.");
        }
    };

    // Hàm lấy danh sách order
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
    // useEffect để lấy danh sách order
    useEffect(() => {
        fetchOrders(); // Gọi fetchOrders ngay khi component được mount
    }, []); // Không cần phụ thuộc vào hasFiltered hoặc orders.length

    // useEffect để lấy danh sách sản phẩm
    useEffect(() => {
        fetch('http://localhost:8000/product')
            .then(response => response.json())
            .then(data => setProducts(data.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Hàm chuyển đổi định dạng ngày tháng YYYY-MM-DD
    function formatDateToYYYYMMDD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    //Hàm xử lý khi thay đổi sản phẩm trên Modal Thêm
    const handleProductChange = (index, event) => {
        const newProducts = orderFormData.orderDetails.products.map((product, i) => {
            if (i === index) {
                return { ...product, productId: event.target.value };
            }
            return product;
        });
        setOrderFormData({ ...orderFormData, orderDetails: { ...orderFormData.orderDetails, products: newProducts } });
    };
    // Hàm xử lý khi thay đổi số lượng sản phẩm trên Modal Thêm
    const handleQuantityChange = (index, event) => {
        const newProducts = orderFormData.orderDetails.products.map((product, i) => {
            if (i === index) {
                return { ...product, quantity: parseInt(event.target.value, 10) };
            }
            return product;
        });
        setOrderFormData({ ...orderFormData, orderDetails: { ...orderFormData.orderDetails, products: newProducts } });
    };
    // Hàm xử lý khi ấn dấu + trên Modal Thêm
    const addNewProduct = () => {
        const newProduct = { productId: '', quantity: 1 };
        setOrderFormData({
            ...orderFormData,
            orderDetails: {
                ...orderFormData.orderDetails,
                products: [...orderFormData.orderDetails.products, newProduct]
            }
        });
    };
    // Hàm để tính tổng giá sản phẩm và hiển thị trên giá của order trên Modal Thêm
    const calculateTotals = () => {
        let totalQuantity = 0;
        let totalCost = 0;

        orderFormData.orderDetails.products.forEach(product => {
            const productData = products.find(p => p._id === product.productId);
            if (productData) {
                totalQuantity += product.quantity;
                totalCost += product.quantity * productData.buyPrice;
            }
        });

        setOrderFormData(prevState => ({
            ...prevState,
            orderDetails: {
                ...prevState.orderDetails,
                totalQuantity: totalQuantity,
                total: totalCost
            },
            order: {
                ...prevState.order,
                cost: totalCost
            }
        }));
    };
    // useEffect cho việc tính toán tổng giá sản phẩm trên Modal Thêm
    useEffect(() => {
        calculateTotals();
    }, [orderFormData.orderDetails.products]);

    // Hàm để xử lý sự kiện khi nhấn nút Sửa
    const handleEdit = async (order) => {
        try {
            const orderDetailsResponse = await fetch(`http://localhost:8000/orderDetail/${order.orderDetails}`);
            const orderDetails = await orderDetailsResponse.json();

            const customerResponse = await fetch(`http://localhost:8000/customer/${order.customer}`);
            const customer = await customerResponse.json();

            setCurrentEditOrder({
                ...order,
                orderDetails: orderDetails.result || [],
                customer: customer.result || []
            });
            console.log(currentEditOrder);
            setIsEditModalOpen(true);
        } catch (error) {
            console.error('Error fetching order details or customer:', error);
            alert('Failed to fetch order details or customer');
        }
    };
    //Hàm xử lý khi ấn nút Confirm trên Modal Sửa
    const handleUpdateConfirm = async () => {
        console.log(currentEditOrder);
        try {
            // Gọi API để cập nhật thông tin sản phẩm trong orderDetails
            await fetch(`http://localhost:8000/orderDetail/${currentEditOrder.orderDetails._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ products: currentEditOrder.orderDetails.products })
            });

            // Gọi API để cập nhật thông tin customer
            await fetch(`http://localhost:8000/customer/${currentEditOrder.customer._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentEditOrder.customer)
            });

            alert('Order and customer information updated successfully!');
            setIsEditModalOpen(false);
            // Cập nhật lại danh sách đơn hàng nếu cần
            fetchOrders();
        } catch (error) {
            console.error('Error updating order and customer:', error);
            alert('Failed to update order and customer information');
        }
    };

    // Hàm để xử lý sự kiện khi nhấn nút Xóa
    const handleDelete = async (orderId) => {
        // Hiển thị thông báo xác nhận
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?");

        if (isConfirmed) {
            // Người dùng xác nhận xóa
            try {
                const response = await fetch(`http://localhost:8000/order/${orderId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error('Có lỗi xảy ra khi xóa đơn hàng');
                }

                // Xử lý thành công, thông báo cho người dùng và cập nhật UI
                alert('Đơn hàng đã được xóa thành công');
                fetchOrders();
                // Cập nhật danh sách đơn hàng, ví dụ: fetchOrders();
            } catch (error) {
                console.error('Error:', error);
                alert('Có lỗi xảy ra khi xóa đơn hàng');
            }
        }
        // Người dùng không xác nhận xóa
    };


    return (
        <div>
            {/* Nút mở Modal */}
            <Button onClick={handleOpenModal} variant="contained" color="success" style={{ margin: '10px' }}>
                Thêm Khách Hàng
            </Button>

            {/* Modal Thêm Đơn Hàng */}
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box style={{ backgroundColor: 'white', padding: 20, margin: '20px auto', width: '60%' }}>
                    <Typography variant="h5" style={{ marginBottom: '20px' }}>Thêm Đơn Hàng Mới</Typography>
                    {/* Form nhập thông tin sản phẩm */}
                    <Typography variant="h6" style={{ marginTop: '20px' }}>Thông Tin Sản Phẩm</Typography>
                    {orderFormData.orderDetails.products.map((product, index) => (
                        <Box key={index} display="flex" alignItems="center" mb={2}>
                            <TextField
                                select
                                label="Product"
                                value={product.productId}
                                onChange={(event) => handleProductChange(index, event)}
                                margin="normal"
                                sx={{ marginRight: '10px', width: '70%' }}
                            >
                                {products.map((p) => (
                                    <MenuItem key={p._id} value={p._id}>
                                        {p.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Quantity"
                                type="number"
                                value={product.quantity}
                                onChange={(event) => handleQuantityChange(index, event)}
                                margin="normal"
                                sx={{ width: '30%' }}
                            />
                        </Box>
                    ))}
                    <Button
                        onClick={addNewProduct}
                        color="primary"
                        variant="contained"
                        style={{ marginTop: '10px', borderRadius: '50%', minWidth: '50px', height: '50px' }}
                    >
                        +
                    </Button>
                    {/* Hiển thị Total Quantity */}
                    <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
                        Total Quantity: {orderFormData.orderDetails.totalQuantity}
                    </Typography>

                    {/* Form nhập thông tin khách hàng */}
                    <Typography variant="h6">Thông Tin Khách Hàng</Typography>
                    <TextField
                        label="Full Name"
                        value={orderFormData.customer.fullName}
                        onChange={(e) => setOrderFormData({ ...orderFormData, customer: { ...orderFormData.customer, fullName: e.target.value } })}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Phone"
                        value={orderFormData.customer.phone}
                        onChange={(e) => setOrderFormData({ ...orderFormData, customer: { ...orderFormData.customer, phone: e.target.value } })}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={orderFormData.customer.email}
                        onChange={(e) => setOrderFormData({ ...orderFormData, customer: { ...orderFormData.customer, email: e.target.value } })}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Address"
                        value={orderFormData.customer.address}
                        onChange={(e) => setOrderFormData({ ...orderFormData, customer: { ...orderFormData.customer, address: e.target.value } })}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="City"
                        value={orderFormData.customer.city}
                        onChange={(e) => setOrderFormData({ ...orderFormData, customer: { ...orderFormData.customer, city: e.target.value } })}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Country"
                        value={orderFormData.customer.country}
                        onChange={(e) => setOrderFormData({ ...orderFormData, customer: { ...orderFormData.customer, country: e.target.value } })}
                        margin="normal"
                        fullWidth
                    />
                    {/* Thêm các trường khác cho thông tin customer */}
                    {/* Hiển thị thông tin OrderDate và Cost */}
                    <Typography variant="subtitle1" style={{ marginTop: '20px' }}>Order Date: {orderFormData.order.orderDate}</Typography>
                    <Typography variant="subtitle1">Cost: {orderFormData.order.cost}</Typography>

                    <Box style={{ marginTop: '20px' }}>
                        <Button onClick={handleConfirm} color="primary">Xác Nhận</Button>
                        <Button onClick={() => setIsModalOpen(false)} color="secondary">Hủy</Button>
                    </Box>
                </Box>
            </Modal>

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
                                                        // Tạo bản sao mới của mảng products
                                                        let newProducts = currentEditOrder.orderDetails.products.map(p => {
                                                            if (p._id === product._id) {
                                                                // Cập nhật quantity cho sản phẩm cụ thể
                                                                return { ...p, quantity: parseInt(e.target.value, 10) || 0 };
                                                            }
                                                            return p;
                                                        });

                                                        // Tính toán totalQuantity và total

                                                        const newTotalQuantity = newProducts.reduce((total, product) => total + product.quantity, 0);


                                                        // Cập nhật state
                                                        setCurrentEditOrder({
                                                            ...currentEditOrder,
                                                            orderDetails: {
                                                                ...currentEditOrder.orderDetails,
                                                                products: newProducts,
                                                                totalQuantity: newTotalQuantity

                                                            }
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
                        (hasFiltered ? filteredOrders : orders).map(order => {
                            // Log ra thông tin của mỗi order
                            return (
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
                            );
                        })
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

