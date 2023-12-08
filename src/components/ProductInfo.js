import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import BreadCrumb from './breadcrumbs/BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../actions/actions';
import LatestProducts from './content/lastestProducts/LatestProducts';
import ViewAll from './content/viewAll/viewAll';
import { Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductInfo = ({ name, buyPrice }) => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.products.productDetails);
    const { isLoading, error } = useSelector(state => state.products);
    const [quantity, setQuantity] = useState(1); 

    useEffect(() => {
        if (_id) {
            dispatch(fetchProductDetails(_id));
        }
    }, [dispatch, _id]);

    // Increment product quantity
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    // Decrement product quantity but not less than 1
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        //Kiểm tra xem có sản phầm nào trùng Id không
        const existingProductIndex = cart.findIndex((product) => product.id === _id);

        if (existingProductIndex !== -1) {
            // Nếu có, thêm số lượng
            cart[existingProductIndex].quantity += 1;
        } else {
            // Nếu không có, thêm sản phẩm vào giỏ với số lượng là 1
            const productToAdd = {
                id: _id,
                name: productDetails.data.name,
                price: productDetails.data.buyPrice,
                quantity: 1
            };
            cart.push(productToAdd);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!productDetails) {
        return <div>Không tìm thấy sản phẩm</div>;
    }

    const breadcrumbs = [
        { name: "Trang chủ", url: "/" },
        { name: "Danh mục sản phẩm", url: "/products" },
        { name: "Thông tin chi tiết", url: `/products/${_id}` }
    ];

    // Styles
    const customFontStyle = {
        fontFamily: "'Happy Monkey', sans-serif",
    };

    const buttonStyle = {
        margin: '0 10px',
        fontSize: '1.5rem',
    };
    // Style gạch giá cũ
    const originalPriceStyle = {
        textDecoration: 'line-through',
        marginRight: '10px'
    };

    return (
        <>
            <Header />
            <Box sx={{ padding: 0.2 }}>
                <BreadCrumb breadcrumbs={breadcrumbs} />
            </Box>
            <Box sx={{ padding: 2 }}>
                <Card raised sx={{ maxWidth: 900, margin: 'auto', backgroundColor: 'white' }}>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <img
                                    src={productDetails.data.imageUrl}
                                    alt={productDetails.data.name}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h3" gutterBottom style={customFontStyle}>
                                    {productDetails.data.name}
                                </Typography>
                                <Typography variant="body1" style={customFontStyle}>
                                    {productDetails.data.description}
                                </Typography>
                                <br />
                                <Typography variant="h5" style={customFontStyle}>
                                    Giá: $ <span  style={originalPriceStyle}>{productDetails.data.buyPrice}  </span> ${productDetails.data.promotionPrice}
                                </Typography>
                                <Typography variant="h6" style={customFontStyle}>
                                    Loại: {productDetails.data.category}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                                    <Button onClick={decrementQuantity} size="large" style={buttonStyle}>
                                        <RemoveIcon fontSize="inherit" />
                                    </Button>
                                    <Typography variant="h5" component="span" style={{ ...customFontStyle, minWidth: '3rem', textAlign: 'center' }}>
                                        {quantity}
                                    </Typography>
                                    <Button onClick={incrementQuantity} size="large" style={buttonStyle}>
                                        <AddIcon fontSize="inherit" />
                                    </Button>
                                </Box>
                                <Button variant="contained" color="success" onClick={addToCart} style={customFontStyle}>
                                    Thêm vào giỏ
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
            <LatestProducts />
            <ViewAll />
            <Footer />
        </>
    );
};

export default ProductInfo;

