import * as React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from './content/lastestProducts/ProductItem';
import ProductFilter from './ProductFilter';
import BreadCrumb from './breadcrumbs/BreadCrumb';
import Pagination from '@mui/material/Pagination';
import { fetchProducts, setCurrentPage } from '../actions/actions';

export default function Products() {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector(state => state.products);

    // Get filter and pagination states from Redux
    const { productName, minPrice, maxPrice, productType, currentPage } = useSelector(state => state.filter);
    const itemsPerPage = 10; // Number of items per page


    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Filter and paginate products based on the Redux state
    const filteredProducts = products
        .filter(product => {
            const productNameLower = product.name?.toLowerCase() || '';
            return productNameLower.includes(productName.toLowerCase());
        })
        .filter(product => !minPrice || product.promotionPrice >= minPrice)
        .filter(product => !maxPrice || product.promotionPrice <= maxPrice)
        .filter(product => !productType.length || productType.includes(product.category));

    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentItems = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Hàm xử lý khi chuyển trang
    const handlePageChange = (event, value) => {
        dispatch(setCurrentPage(value));
    };

    //BreadCrumb
    const breadcrumbs = [
        {
            name: "Trang chủ",
            url: "/"
        },
        {
            name: "Danh mục sản phẩm",
            url: "/products"
        }
    ];

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!isLoading && !error && (
                <div>
                    <BreadCrumb breadcrumbs={breadcrumbs} />
                    <div className="container main-container">
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1 }}> 
                                <ProductFilter />
                            </div>
                            <div style={{ flex: 2 }}>
                                <div className='row'>
                                    {currentItems.map((product, index) => (
                                        <ProductItem key={index}
                                            name={product.name}
                                            imageUrl={product.imageUrl}
                                            description={product.description}
                                            category={product.category}
                                            buyPrice={product.promotionPrice}>
                                        </ProductItem>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
