import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ name, imageUrl, description, category, buyPrice, promotionPrice, _id, className  }) => {
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
        <div className={`col-6 col-sm-4 ${className}`}>
            <div className="product-box card bg-light mb-3" style={{ backgroundColor: '#01723e' }}>
                <div className="card-header text-center">
                    <h5 className="card-title" >
                        <button className="btn btn-link" onClick={navigateToProductDetails} style={buttonStyle}>{name}</button>
                    </h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img
                            className="card-img-top"
                            alt="product"
                            src={imageUrl}
                            onClick={navigateToProductDetails}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                    <p className="card-text description">{description}</p>
                    <p className="card-text" style={textStyle}>
                        <b>Loại:</b> {category}
                    </p>
                    <p className="card-text" style={textStyle}>
                        <b>Giá:</b> $<span style={originalPriceStyle}>{buyPrice} </span> ${promotionPrice} 
                    </p>
                <div className="add-cart-container text-center">
                    <button type="button" className="btn btn-secondary" onClick={navigateToProductDetails}>Chi tiết</button>
                     <button type="button" className="btn btn-success" onClick={addToCart}>Thêm vào giỏ</button>
                </div>
            </div>
        </div>
        </div >
    );
};

export default ProductItem;
