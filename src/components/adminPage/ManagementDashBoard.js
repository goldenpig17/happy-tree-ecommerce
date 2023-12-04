import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import ProductTable from './tables/ProductTable';
import CustomerTable from './tables/CustomerTable';
import OrderTable from './tables/OrderTable';


const ManagementDashboard = () => {
    const [activeTable, setActiveTable] = useState('products'); // products, customers, orders

    return (
        <div>
            {/* Tiêu đề */}
            <Typography variant="h3" align="center" style={{ margin: '20px 0', fontWeight: 'bold' }}>
                Dashboard Quản Lý
            </Typography>

            {/* Các nút để chuyển đổi giữa các bảng */}
            <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
                <button
                    variant="contained"
                    style={{
                        backgroundColor: '#0277bd', // Màu xanh nước biển đậm
                        color: 'white',
                        margin: '0 10px', // Khoảng cách giữa các nút
                        borderRadius: '20px', // Bo viền tròn
                        padding: '10px 20px' // Tăng kích thước
                    }}
                    onClick={() => setActiveTable('products')}
                >
                    Sản Phẩm</button>
                <button
                    variant="contained"
                    style={{
                        backgroundColor: '#0277bd', // Màu xanh nước biển đậm
                        color: 'white',
                        margin: '0 10px', // Khoảng cách giữa các nút
                        borderRadius: '20px', // Bo viền tròn
                        padding: '10px 20px' // Tăng kích thước
                    }}
                    onClick={() => setActiveTable('customers')}
                >
                    Khách Hàng</button>
                <button
                    variant="contained"
                    style={{
                        backgroundColor: '#0277bd', // Màu xanh nước biển đậm
                        color: 'white',
                        margin: '0 10px', // Khoảng cách giữa các nút
                        borderRadius: '20px', // Bo viền tròn
                        padding: '10px 20px' // Tăng kích thước
                    }}
                    onClick={() => setActiveTable('orders')}
                >
                    Đơn Hàng</button>
            </Box>
            {/* Hiển thị bảng dựa trên activeTable */}
            {activeTable === 'products' && <ProductTable />}
            {activeTable === 'customers' && <CustomerTable />}
            {activeTable === 'orders' && <OrderTable />}
        </div>
    );
};

export default ManagementDashboard;