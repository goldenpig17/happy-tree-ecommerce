import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import BreadCrumb from './breadcrumbs/BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../actions/actions';
import LatestProducts from './content/lastestProducts/LatestProducts';
import ViewAll from './content/viewAll/viewAll';

const ProductInfo = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.products.productDetails);
    console.log(productDetails);
    const { isLoading, error } = useSelector(state => state.products);

    useEffect(() => {
        if (_id) {
            dispatch(fetchProductDetails(_id));
        }
    }, [dispatch, _id]);

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
            <BreadCrumb breadcrumbs={breadcrumbs} />
            <h1 style={{ textAlign: 'center' }}>Thông tin chi tiết</h1>
            <div className="product-info-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
                    <button type="button" className="btn btn-primary">Thêm vào giỏ</button>
                </div>
            </div>
            <h3>Thông tin mô tả</h3>
            <p>{productDetails.data.description}</p>
            <h3>Sản phẩm liên quan</h3>
            <LatestProducts />
            <ViewAll />
            <Footer />
        </>
    );
};

export default ProductInfo;
