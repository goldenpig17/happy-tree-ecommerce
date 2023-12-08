import React from 'react';
import { useEffect, useState } from "react";
import { Paper, FormControl, Button, Modal, Select, MenuItem, InputLabel, Table, TableBody, TableCell, TableHead, TableRow, TextField, Slider, FormGroup, FormControlLabel, Checkbox, Box, Typography } from '@mui/material';


const ProductTable = () => {
    const [products, setProducts] = useState([]);
    //State lọc sản phẩm
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]); // Giả sử giá từ 0 đến 1000
    const [selectedCategories, setSelectedCategories] = useState([]);
    //State Modal Thêm sản phẩm
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productFormData, setProductFormData] = useState({
        name: '',
        type: '',
        description: '',
        imageUrl: '',
        buyPrice: '',
        promotionPrice: '',
        amount: ''
    });
    const [productTypes, setProductTypes] = useState([]);
    //State Modal Sửa Sản phẩm
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentEditProduct, setCurrentEditProduct] = useState(null);


    const fetchApi = async (url, body) => {
        const response = await fetch(url, body);

        const data = await response.json();

        return data;
    }
    //Hàm gọi API Loại sản phẩm
    useEffect(() => {
        fetchApi("http://localhost:8000/productType")
            .then(data => {
                setProductTypes(data.result);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    // Hàm xử lý thay đổi trên các trường input
    const handleInputChange = (event) => {
        setProductFormData({ ...productFormData, [event.target.name]: event.target.value });
    };

    // Hàm xử lý mở Modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    //Hàm xử lý khi ấn Confirm trên Modal
    const handleConfirm = () => {
        // Đảm bảo tất cả trường thông tin đã được nhập
        if (Object.values(productFormData).some(field => field === '')) {
            alert('Vui lòng nhập tất cả thông tin sản phẩm');
            return;
        }

        // Gửi yêu cầu tới API để tạo hoặc cập nhật sản phẩm
        fetch('http://localhost:8000/product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productFormData)
        })
            .then(response => {
                if (!response.ok) {
                    // Xử lý trường hợp lỗi từ API
                    throw new Error('Sản phẩm với tên này đã tồn tại');
                }
                return response.json();
            })
            .then(data => {
                // Xử lý phản hồi từ server
                if (data.message.includes("cập nhật")) {
                    alert('Sản phẩm đã được cập nhật');
                } else if (data.message.includes("thêm thành công")) {
                    alert('Sản phẩm đã được thêm thành công');
                }
                setIsModalOpen(false);
                // Cập nhật lại danh sách sản phẩm
                fetchApi("http://localhost:8000/product")
                    .then(data => {
                        setProducts(data.data);
                        setFilteredProducts(data.data);
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Có lỗi xảy ra khi xử lý sản phẩm');
            });
    };

    //Hàm gọi danh sách sản phẩm
    useEffect(() => {
        fetchApi("http://localhost:8000/product")
            .then((data) => {
                setProducts(data.data);
                setFilteredProducts(data.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, []);

    //Hàm set sản phẩm đã lọc
    useEffect(() => {
        let updatedProducts = products;

        // Lọc theo tên sản phẩm
        if (searchTerm) {
            updatedProducts = updatedProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Lọc theo giá sản phẩm
        updatedProducts = updatedProducts.filter(product =>
            product.buyPrice >= priceRange[0] && product.buyPrice <= priceRange[1]
        );

        // Lọc theo loại sản phẩm
        if (selectedCategories.length > 0) {
            updatedProducts = updatedProducts.filter(product =>
                selectedCategories.includes(product.category)
            );
        }

        setFilteredProducts(updatedProducts);
    }, [searchTerm, priceRange, selectedCategories, products]);

    //Hàm xử lý lọc sản phẩm theo loại
    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Hàm để xử lý sự kiện khi nhấn nút Sửa
    const handleEdit = (product) => {
        setCurrentEditProduct(product);
        setIsEditModalOpen(true);
    };
    //Hàm xử lý khi ấn nút Confirm trên Modal Sửa
    const handleUpdateConfirm = () => {
        fetch(`http://localhost:8000/product/${currentEditProduct._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentEditProduct)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Có lỗi xảy ra khi cập nhật sản phẩm');
                }
                return response.json();
            })
            .then(data => {
                alert('Sản phẩm đã được cập nhật thành công');
                setIsEditModalOpen(false);
                // Cập nhật lại danh sách sản phẩm
                fetchApi("http://localhost:8000/product")
                    .then(data => {
                        setProducts(data.data);
                        setFilteredProducts(data.data);
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    };

    // Hàm để xử lý sự kiện khi nhấn nút Xóa
    const handleDelete = (productId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            fetch(`http://localhost:8000/product/${productId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Có lỗi xảy ra khi xóa sản phẩm');
                    }
                    return response.json();
                })
                .then(data => {
                    alert('Sản phẩm đã được xóa thành công');
                    // Cập nhật lại danh sách sản phẩm
                    fetchApi("http://localhost:8000/product")
                        .then(data => {
                            setProducts(data.data);
                            setFilteredProducts(data.data);
                        })
                        .catch(error => console.error('Error:', error));
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert(error.message);
                });
        }
    };

    const customFontStyle = {
        fontFamily: "'Happy Monkey', sans-serif",
    };
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#fef9cc',
        boxShadow: 24,
        p: 4, // Padding
    };
    //Button Confirm Style
    const buttonConfirmStyle = {
        backgroundColor: '#6c8e5d',
        '&:hover': {
            backgroundColor: '#388E3C',
        },
        fontFamily: "'Happy Monkey', sans-serif",
        fontSize: 'large',
        color: '#fef7d0',
        fontweight: 'bold',
        cursor: 'pointer',
        margin: '10px 0',
    };
    // Button Cancel Style
    const buttonCancelStyle = {
        backgroundColor: '#fcba03',
        '&:hover': {
            backgroundColor: '#ff0011',
        },
        fontFamily: "'Happy Monkey', sans-serif",
        fontSize: 'large',
        color: '#01723e',
        fontweight: 'bold',
        cursor: 'pointer',
        margin: '20px 0',
    };

    return (
        <Box sx={{ ...customFontStyle, padding: 2 }}>
            {/* Modal Thêm sản phẩm*/}
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box sx={modalStyle}>
                    <h2 style={{ ...customFontStyle, fontWeight: 'bold', fontSize: '1.6rem' }}>Thêm Sản Phẩm</h2>
                    <TextField label="Tên Sản Phẩm" name="name" onChange={handleInputChange} fullWidth margin="normal" />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Loại Sản Phẩm</InputLabel>
                        <Select
                            name="type"
                            value={productFormData.type}
                            onChange={handleInputChange}
                        >
                            {productTypes.map(type => (
                                <MenuItem key={type._id} value={type._id}>{type.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField label="Mô tả" name="description" onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="ImageUrl" name="imageUrl" onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="Giá niêm yết" name="buyPrice" onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="Giá bán" name="promotionPrice" onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="Số lượng" name="amount" onChange={handleInputChange} fullWidth margin="normal" />
                    {/* Các trường input khác: description, imageUrl, buyPrice, promotionPrice, amount */}
                    <Button onClick={handleConfirm} style={buttonConfirmStyle}>Xác Nhận</Button>
                    <Button onClick={() => setIsModalOpen(false)} style={buttonCancelStyle}>Hủy</Button>
                </Box>
            </Modal>
            {/* Modal Sửa sản phẩm*/}
            <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h5" style={{ ...customFontStyle, fontWeight: 'bold', fontSize: '1.6rem' }}>Sửa Sản Phẩm - ID: {currentEditProduct?._id}</Typography>
                    <TextField label="Tên Sản Phẩm" name="name" value={currentEditProduct?.name} onChange={e => setCurrentEditProduct({ ...currentEditProduct, name: e.target.value })} fullWidth margin="normal" />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Loại Sản Phẩm</InputLabel>
                        <Select
                            name="type"
                            value={productFormData.type}
                            onChange={handleInputChange}
                        >
                            {productTypes.map(type => (
                                <MenuItem key={type._id} value={type._id}>{type.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField label="Mô tả" name="description" value={currentEditProduct?.description} onChange={e => setCurrentEditProduct({ ...currentEditProduct, name: e.target.value })} fullWidth margin="normal" />
                    <TextField label="Image Url" name="imageUrl" value={currentEditProduct?.imageUrl} onChange={e => setCurrentEditProduct({ ...currentEditProduct, name: e.target.value })} fullWidth margin="normal" />
                    <TextField label="Giá bán" name="buyPrice" value={currentEditProduct?.buyPrice} onChange={e => setCurrentEditProduct({ ...currentEditProduct, name: e.target.value })} fullWidth margin="normal" />
                    <TextField label="Giá niêm yết" name="promotionPrice" value={currentEditProduct?.promotionPrice} onChange={e => setCurrentEditProduct({ ...currentEditProduct, name: e.target.value })} fullWidth margin="normal" />
                    <TextField label="Số lượng" name="amount" value={currentEditProduct?.amount} onChange={e => setCurrentEditProduct({ ...currentEditProduct, name: e.target.value })} fullWidth margin="normal" />
                    <Button onClick={handleUpdateConfirm} style={buttonConfirmStyle}>Cập Nhật</Button>
                    <Button onClick={() => setIsEditModalOpen(false)} style={buttonCancelStyle}>Hủy</Button>
                </Box>
            </Modal>
            {/* Lọc sản phẩm */}
            <Box
                border={1}
                borderColor="purple"
                borderRadius={4}
                p={2}
                mb={2}
                style={{ backgroundColor: 'lavender', width: '33%' }}
            >
                <Typography variant="h5" color="purple" style={{ ...customFontStyle, margin: '5px 0', fontWeight: 'bold' }}>Lọc Sản Phẩm Theo Tên</Typography>
                <TextField
                    label="Tìm kiếm sản phẩm theo tên"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <br></br>
                <Typography variant="h5" color="purple" style={{ ...customFontStyle, margin: '10px 0', fontWeight: 'bold' }}>Lọc Sản Phẩm Theo Giá</Typography>
                <Slider
                    value={priceRange}
                    onChange={(e, newValue) => setPriceRange(newValue)}
                    valueLabelDisplay="auto"
                    max={100}
                />
                <br></br>
                <Typography variant="h5" color="purple" style={{ ...customFontStyle, margin: '5px 0', fontWeight: 'bold' }}>Lọc Sản Phẩm Theo Loại</Typography>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={selectedCategories.includes('Sativa')} onChange={() => handleCategoryChange('Sativa')} />}
                        label="Sativa"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={selectedCategories.includes('Hybrid')} onChange={() => handleCategoryChange('Hybrid')} />}
                        label="Hybrid"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={selectedCategories.includes('Indica')} onChange={() => handleCategoryChange('Indica')} />}
                        label="Indica"
                    />
                </FormGroup>
            </Box>
            {/* Bảng hiện thị danh sách sản phẩm */}
            <Paper elevation={3} sx={{ margin: 2, textAlign: 'center', padding: 2 }}>
                <Typography variant="h3" component="h2" sx={{ ...customFontStyle, marginBottom: 2 }}>
                    Danh sách sản phẩm
                </Typography>
                {/* Nút mở Modal */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                    <Button onClick={handleOpenModal} variant="contained" color="success">
                        Thêm Sản Phẩm
                    </Button>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{ margin: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Mô tả sản phẩm</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Loại</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Giá niêm yết</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Giá khuyến mãi</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map(product => (
                            <TableRow key={product._id}>
                                <TableCell style={{ fontSize: '1.1rem' }}>{product._id}</TableCell>
                                <TableCell style={{ fontSize: '1.1rem' }}>{product.name}</TableCell>
                                <TableCell style={{ fontSize: '1.1rem' }}>{product.description}</TableCell>
                                <TableCell style={{ fontSize: '1.1rem' }}>{product.category}</TableCell>
                                <TableCell style={{ fontSize: '1.1rem' }}>{product.buyPrice}</TableCell>
                                <TableCell style={{ fontSize: '1.1rem' }}>{product.promotionPrice}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(product)} style={{ backgroundColor: 'green', color: 'white', borderRadius: '5px' }}>Sửa</Button>
                                    <Button onClick={() => handleDelete(product._id)} style={{ backgroundColor: 'red', color: 'white', borderRadius: '5px' }}>Xóa</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
}

export default ProductTable;



