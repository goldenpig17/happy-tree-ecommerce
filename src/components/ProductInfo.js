import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import BreadCrumb from './breadcrumbs/BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../actions/actions';
import LatestProducts from './content/lastestProducts/LatestProducts';
import ViewAll from './content/viewAll/viewAll';
import { Paper, Box } from '@mui/material';

const ProductInfo = ({ name, buyPrice }) => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.products.productDetails);
    console.log(productDetails);
    const { isLoading, error } = useSelector(state => state.products);
    const [quantity, setQuantity] = useState(1); // State for product quantity

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

        // Check if the product with the same _id already exists in the cart
        const existingProductIndex = cart.findIndex((product) => product.id === _id);

        if (existingProductIndex !== -1) {
            // If the product exists, update its quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If the product doesn't exist, add it to the cart with quantity 1
            const productToAdd = {
                id: _id,
                name: productDetails.data.name,
                price: productDetails.data.buyPrice,
                quantity: 1
            };
            cart.push(productToAdd);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        // Dispatch a custom event
        window.dispatchEvent(new Event('cartUpdated'));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!productDetails) {
        return <div>Product not found</div>;
    }

    const breadcrumbs = [
        { name: "Trang chủ", url: "/" },
        { name: "Danh mục sản phẩm", url: "/products" },
        { name: "Thông tin chi tiết", url: `/products/${_id}` }
    ];

    return (
        <>
            <Header />
            <Box sx={{ padding: 0.2 }}>
                <Paper elevation={1} sx={{ padding: 0.1, margin: 1 }}>
                    <BreadCrumb breadcrumbs={breadcrumbs} />
                </Paper>
            </Box>
            <Box sx={{ padding: 2 }}>
                <Paper elevation={3} sx={{ padding: 3, margin: 2, backgroundColor: '#fef7d0' }}>
                    <h1 style={{ textAlign: 'center' }}>Thông tin chi tiết</h1>
                    <div className="product-info-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="product-image" style={{ flex: 1 }}>
                            <img
                                src={productDetails.data.imageUrl}
                                alt={productDetails.data.name}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                        <div className="product-details" style={{ flex: 3 }}>
                            <h1>{productDetails.data.name}</h1>
                            <p>Giá: ${productDetails.data.buyPrice}</p>
                            <p>Loại: {productDetails.data.category}</p>
                            <div>
                                <button onClick={decrementQuantity}>-</button>
                                <span>{quantity}</span>
                                <button onClick={incrementQuantity}>+</button>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={addToCart}>Thêm vào giỏ</button>
                        </div>
                    </div>
                    <br/>
                    <h3>Thông tin mô tả</h3>
                    <p>{productDetails.data.description}</p>
                    <br/>
                    <h3>Sản phẩm liên quan</h3>
                </Paper>
            </Box>
            <LatestProducts />
            <ViewAll />
            <Footer />
        </>
    );
};

export default ProductInfo;
