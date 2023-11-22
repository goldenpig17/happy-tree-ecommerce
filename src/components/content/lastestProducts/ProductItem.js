import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ name, imageUrl, description, category, buyPrice, _id }) => {
    console.log(_id);
    console.log(name);
    const navigate = useNavigate();

    const navigateToProductDetails = () => {
        // Prevent default anchor action
        navigate(`/products/${_id}`);
    };

    return (
        <div className="col-6 col-sm-4">
            <div className="product-box card bg-light mb-3">
                <div className="card-header text-center">
                    <h5 className="card-title">
                        <button className="btn btn-link" onClick={navigateToProductDetails}>{name}</button>
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
                    <p className="card-text">
                        <b>Loại:</b> {category}
                    </p>
                    <p className="card-text">
                        <b>Giá:</b> {buyPrice} $
                    </p>
                    <div className="add-cart-container text-center">
                        <button type="button" className="btn btn-primary">Thêm vào giỏ</button>
                        <button type="button" className="btn btn-secondary" onClick={navigateToProductDetails}>Chi tiết</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
