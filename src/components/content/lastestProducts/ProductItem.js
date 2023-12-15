import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardHeader, CardMedia, CardContent, Typography, Button } from '@mui/material';

const ProductItem = ({ name, imageUrl, description, category, buyPrice, promotionPrice, _id, className }) => {
    const navigate = useNavigate();
    const navigateToProductDetails = () => {
        // Prevent default anchor action
        navigate(`/products/${_id}`);
    };
    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Check if the product with the same _id already exists in the cart
        const existingProductIndex = cart.findIndex((product) => product.id === _id);

        if (existingProductIndex !== -1) {
            // If the product exists, update its quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If the product doesn't exist, add it to the cart with quantity 1
            const productToAdd = {
                id: _id,
                name: name,
                price: buyPrice,
                quantity: 1
            };
            cart.push(productToAdd);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        // Dispatch a custom event
        window.dispatchEvent(new Event('cartUpdated'));
    };

    // Font Style
    const buttonStyle = {
        fontFamily: "'Happy Monkey', sans-serif",
        fontSize: 'larger',
        color: '#01723e',
        cursor: 'pointer'
    };

    // Custom styles cho Loại và Giá
    const textStyle = {
        fontFamily: "'Happy Monkey', sans-serif",
        fontSize: 'larger',
        color: '#01723e'
    };

    // Style gạch giá cũ
    const originalPriceStyle = {
        textDecoration: 'line-through',
        marginRight: '10px'
    };

    return (
        <Grid item xs={12} sm={6} md={4} className={className}>
            <Card className="product-box bg-light mb-3" style={{ backgroundColor: '#01723e' }}>
                <CardHeader
                    title={<Button onClick={navigateToProductDetails} style={buttonStyle}>{name}</Button>}
                    className="text-center"
                />
                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt="product"
                    onClick={navigateToProductDetails}
                    style={{ cursor: 'pointer' }}
                />
                <CardContent>
                    <Typography variant="body2" className="card-text description">{description}</Typography>
                    <Typography style={textStyle}>
                        <b>Loại:</b> {category}
                    </Typography>
                    <Typography style={textStyle}>
                        <b>Giá:</b> <span style={originalPriceStyle}>${buyPrice}</span> ${promotionPrice}
                    </Typography>
                    <div className="add-cart-container text-center">
                        <Button variant="contained" color="secondary" onClick={navigateToProductDetails}>Chi tiết</Button>
                        <Button variant="contained" color="primary" onClick={addToCart}>Thêm vào giỏ</Button>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ProductItem;
