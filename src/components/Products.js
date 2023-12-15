import * as React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from './content/lastestProducts/ProductItem';
import ProductFilter from './ProductFilter';
import BreadCrumb from './breadcrumbs/BreadCrumb';
import Pagination from '@mui/material/Pagination';
import { fetchProducts, setCurrentPage } from '../actions/actions';
import Header from './header/Header';
import {
    Grid,
    Paper,
    Box,
    Typography
} from '@mui/material';

export default function Products() {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector(state => state.products);

    const { productName, minPrice, maxPrice, productType, currentPage } = useSelector(state => state.filter);
    const itemsPerPage = 10;


    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Filter và phân trang sản phẩm
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

    // Font Style
    const customFontStyle = {
        fontFamily: "'Happy Monkey', sans-serif",
    };

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!isLoading && !error && (
                <div>
                    <Header />
                    <BreadCrumb breadcrumbs={breadcrumbs} />
                    <Box sx={{ marginBottom: 3 }}>
                        <Paper sx={{ padding: 2, backgroundColor: '#fef7d0', boxShadow: 3 }}>
                            <Typography variant="h3" gutterBottom component="div" sx={{ ...customFontStyle, fontWeight: 'bold', textAlign: 'center' }}>
                                Danh Sách Sản Phẩm
                            </Typography>
                        </Paper>
                    </Box>
                    <div className="container main-container">
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1 }}>
                                <ProductFilter />
                            </div>
                            <div style={{ flex: 2 }}>
                                <Grid container spacing={2}>
                                    {currentItems.map((product, _id) => (
                                        <ProductItem key={_id}
                                            _id={product._id}
                                            name={product.name}
                                            imageUrl={product.imageUrl}
                                            description={product.description}
                                            category={product.category}
                                            buyPrice={product.buyPrice}
                                            promotionPrice={product.promotionPrice}>
                                        </ProductItem>
                                    ))}
                                </Grid>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} />
                        </div>
                    </div>
                </div >
            )
            }
        </>
    )
}
