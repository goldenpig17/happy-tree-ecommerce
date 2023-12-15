import * as React from 'react';
import { useEffect, useState } from "react";
import ProductItem from './ProductItem';
import "./latestProducts.css";
import { Grid } from '@mui/material';


export default function LatestProducts() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * 6;
    const indexOfFirstItem = indexOfLastItem - 6;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(products.length / 6);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const fetchApi = async (url, body) => {
        const response = await fetch(url, body);

        const data = await response.json();

        return data;
    }

    useEffect(() => {
        fetchApi("http://localhost:8000/product")
            .then((data) => {
                setProducts(data.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, []);


    return (
        <>
            <Grid container spacing={2}>
                {currentProducts.slice(0, 6).map((product, _id) => (
                    <ProductItem key={_id}
                        className="product-item"
                        _id={product._id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        category={product.category}
                        buyPrice={product.buyPrice}
                        promotionPrice={product.promotionPrice}>
                    </ProductItem>
                ))}
            </Grid>
            {/* Thanh phân trang */}
            <div className="pagination-container">
                <button
                    className="pagination-button"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="pagination-button"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </>
    )
}
