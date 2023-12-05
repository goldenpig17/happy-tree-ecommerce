import React, { useEffect, useState } from "react";
import { Button, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createCustomer } from "../../../actions/actions";

const CustomerTable = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState(customers);
    const [searchTerm, setSearchTerm] = useState('');
    // State Modal Thêm khách hàng
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customerFormData, setCustomerFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        country: ''
    });
    //State Modal Sửa Sản phẩm
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentEditCustomer, setCurrentEditCustomer] = useState(null);

    const dispatch = useDispatch();

    // Hàm xử lý thay đổi trên các trường input
    const handleInputChange = (event) => {
        setCustomerFormData({ ...customerFormData, [event.target.name]: event.target.value });
    };
    // Hàm xử lý mở Modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    //Hàm xử lý khi ấn Confirm trên Modal
    const handleConfirm = async () => {
        // Đảm bảo tất cả trường thông tin đã được nhập
        if (Object.values(customerFormData).some(field => field === '')) {
            alert('Vui lòng nhập tất cả thông tin khách hàng');
            return;
        }

        try {
            // Tạo một object chứa thông tin khách hàng từ customerFormData
            const customerData = {
                fullName: customerFormData.fullName,
                phone: customerFormData.phone,
                email: customerFormData.email,
                address: customerFormData.address,
                city: customerFormData.city,
                country: customerFormData.country,
            };

            // Gửi yêu cầu POST tới API để tạo khách hàng
            const response = await fetch('http://localhost:8000/customer/customerTable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerData),
            });

            if (response.ok) {
                // Nếu request thành công
                alert('Customer created successfully');
                fetchCustomers(); // Gọi hàm fetchCustomers để cập nhật danh sách khách hàng
            } else {
                // Nếu có lỗi trong request
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                alert(errorData.message || 'Có lỗi xảy ra khi tạo khách hàng');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Có lỗi xảy ra khi tạo khách hàng');
        }
    };


    const fetchCustomers = async () => {
        // API call to fetch customers
        const response = await fetch("http://localhost:8000/customer");
        const data = await response.json();
        setCustomers(data.result);
        setFilteredCustomers(data.result);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    //Hàm xử lý khi tìm kiếm bộ lọc
    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = customers.filter(customer => {
            const customerName = customer.fullName ? customer.fullName.toLowerCase() : '';
            const customerPhone = customer.phone ? customer.phone.toLowerCase() : '';
            const customerEmail = customer.email ? customer.email.toLowerCase() : '';

            return customerName.includes(value) || customerPhone.includes(value) || customerEmail.includes(value);
        });
        setFilteredCustomers(filtered);
    };

    // Hàm xử lý khi ấn nút Sửa và Xóa
    // Hàm để xử lý sự kiện khi nhấn nút Sửa
    const handleEdit = (customer) => {
        setCurrentEditCustomer(customer);
        setIsEditModalOpen(true);
    };
    //Hàm xử lý khi ấn nút Confirm trên Modal Sửa
    const handleUpdateConfirm = () => {
        fetch(`http://localhost:8000/customer/${currentEditCustomer._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentEditCustomer)
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
                fetchCustomers();
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    };

    //Hàm xử lý khi ấn nút Xóa
    // Hàm để xử lý sự kiện khi nhấn nút Xóa
    const handleDelete = (customerId) => {
        // Gửi yêu cầu để kiểm tra đơn hàng của khách hàng
        fetch(`http://localhost:8000/order/customer?customerId=${customerId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Không thể kiểm tra đơn hàng của khách hàng');
                }
                return response.json();
            })
            .then(data => {
                // Nếu có đơn hàng chứa customerId tương ứng, thông báo không thể xóa
                if (data.message === 'Khách hàng này có các đơn hàng liên quan, không thể xóa!') {
                    alert(data.message);
                } else {
                    // Nếu không có đơn hàng nào chứa customerId tương ứng, hỏi xác nhận trước khi xóa
                    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này không?")) {
                        // Gửi yêu cầu để xóa khách hàng
                        fetch(`http://localhost:8000/customer/${customerId}`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Có lỗi xảy ra khi xóa khách hàng');
                                }
                                return response.json();
                            })
                            .then(() => {
                                alert('Khách hàng đã được xóa thành công');
                                fetchCustomers();
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                alert(error.message);
                            });
                    } else {
                        throw new Error('Hủy bỏ thao tác xóa');
                    }
                }
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
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box style={{ backgroundColor: 'white', padding: 20, margin: '20px auto', width: '50%' }}>
                    <Typography variant="h5">Thêm Khách Hàng</Typography>
                    <TextField label="Họ tên" name="fullName" onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="Số điện thoại" name="phone" onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="Email" name="email" onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="Địa chỉ" name="address" onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="Thành phố" name="city" onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="Quốc gia" name="country" onChange={handleInputChange} fullWidth margin="normal" />
                    {/* Cột Action */}
                    <Button onClick={handleConfirm} color="primary">Xác Nhận</Button>
                    <Button onClick={() => setIsModalOpen(false)} color="secondary">Hủy</Button>
                </Box>
            </Modal>
            {/* Modal Sửa Khách hàng*/}
            <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <Box style={{ backgroundColor: 'white', padding: 20, margin: '20px auto', width: '50%' }}>
                    <Typography variant="h5">Sửa Thông Tin Khách Hàng - ID: {currentEditCustomer?._id}</Typography>
                    <TextField
                        label="Họ Tên"
                        name="fullName"
                        value={currentEditCustomer?.fullName}
                        onChange={e => setCurrentEditCustomer({ ...currentEditCustomer, fullName: e.target.value })}
                        fullWidth margin="normal" />
                    <TextField
                        label="Số điện thoại"
                        name="phone"
                        value={currentEditCustomer?.phone}
                        onChange={e => setCurrentEditCustomer({ ...currentEditCustomer, phone: e.target.value })}
                        fullWidth margin="normal" />
                    <TextField
                        label="Email"
                        name="email"
                        value={currentEditCustomer?.email}
                        onChange={e => setCurrentEditCustomer({ ...currentEditCustomer, email: e.target.value })}
                        fullWidth margin="normal" />
                    <TextField
                        label="Địa chỉ"
                        name="address"
                        value={currentEditCustomer?.address}
                        onChange={e => setCurrentEditCustomer({ ...currentEditCustomer, address: e.target.value })}
                        fullWidth margin="normal" />
                    <TextField
                        label="Thành phố"
                        name="city"
                        value={currentEditCustomer?.city}
                        onChange={e => setCurrentEditCustomer({ ...currentEditCustomer, city: e.target.value })}
                        fullWidth margin="normal" />
                    <TextField
                        label="Quốc gia"
                        name="country"
                        value={currentEditCustomer?.country}
                        onChange={e => setCurrentEditCustomer({ ...currentEditCustomer, country: e.target.value })}
                        fullWidth margin="normal" />
                    <Button onClick={handleUpdateConfirm} color="primary">Cập Nhật</Button>
                    <Button onClick={() => setIsEditModalOpen(false)} color="secondary">Hủy</Button>
                </Box>
            </Modal>
            <Box
                border={1}
                borderColor="purple"
                borderRadius={4}
                p={2}
                mb={2}
                style={{ backgroundColor: 'lavender', width: '33%' }}>
                <Typography variant="h5" color="purple" style={{ margin: '5px 0', fontWeight: 'bold' }}>Lọc Khách Hàng</Typography>
                <TextField label="Họ tên, số điện thoại và/hoặc email" value={searchTerm} onChange={handleSearchChange} fullWidth style={{ width: '50%' }} />
            </Box>
            {/* Bảng hiển thị danh sách khách hàng */}
            <h2 style={{ textAlign: 'center' }}>
                Danh sách khách hàng
            </h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>ID</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Họ tên</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Email</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Số điện thoại</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Địa chỉ</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Thành phố</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Quốc gia</TableCell>
                        <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(filteredCustomers) && filteredCustomers.length > 0 ? (
                        filteredCustomers.map(customer => (
                            <TableRow key={customer._id}>
                                <TableCell>{customer._id}</TableCell>
                                <TableCell>{customer.fullName}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell>{customer.city}</TableCell>
                                <TableCell>{customer.country}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(customer)} style={{ backgroundColor: 'green', color: 'white', borderRadius: '5px' }}>Sửa</Button>
                                    <Button onClick={() => handleDelete(customer._id)} style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px' }}>Xóa</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={9}>No customers found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default CustomerTable;
