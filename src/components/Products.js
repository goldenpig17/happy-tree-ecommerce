import * as React from 'react';
import { useEffect, useState } from "react";
import ProductItem from './content/lastestProducts/ProductItem';
import ProductFilter from './ProductFilter';
import BreadCrumb from './breadcrumbs/BreadCrumb';
import Pagination from '@mui/material/Pagination';

export default function Products() {
    const [products, setProducts] = useState([]);
    // Set State cho sản phẩm cần lọc
    const [filteredProducts, setFilteredProducts] = useState([]);
    //Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    // Tính số trang
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    // Tính số sản phẩm trên một trang
    const currentItems = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const fetchApi = async (url, body) => {
        const response = await fetch(url, body);

        const data = await response.json();

        return data;
    }

    useEffect(() => {
        fetchApi("http://localhost:8000/product")
            .then((data) => {
                console.log(data);
                setProducts(data.data);
                setFilteredProducts(data.data);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, []);

    //Hàm Lọc sản phẩm
    const handleFilter = (filterCriteria) => {
        const { name, minPrice, maxPrice, types } = filterCriteria;

        // Lọc theo tên
        let filtered = products.filter(product =>
            product.name.toLowerCase().includes(name.toLowerCase())
        );

        // Lọc theo giá
        if (minPrice !== '') {
            filtered = filtered.filter(product => product.promotionPrice >= minPrice);
        }
        if (maxPrice !== '') {
            filtered = filtered.filter(product => product.promotionPrice <= maxPrice);
        }

        // Lọc theo Loại
        if (types && types.length > 0) {
            filtered = filtered.filter(product =>
                types.includes(product.category)
            );
        }

        setFilteredProducts(filtered);
    };

    // Hàm xử lý khi chuyển trang
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
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
            <div>
                <BreadCrumb breadcrumbs={breadcrumbs} />
            </div>
            <div className="container main-container">
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: 1 }}> {/* Filter section */}
                        <ProductFilter onFilter={handleFilter} />
                    </div>
                    <div style={{ flex: 2 }}>
                        <div className='row'>
                            {currentItems.map((product, _id) => (
                                <ProductItem key={_id}
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
        </>
    )
}
