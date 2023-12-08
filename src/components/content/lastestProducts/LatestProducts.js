import * as React from 'react';
import { useEffect, useState } from "react";
import ProductItem from './ProductItem';

export default function LatestProducts() {
    const [products, setProducts] = useState([]);

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
            <div className="container main-container">
                <div className='row'>
                    {products.slice(0, 6).map((product, _id) => (
                        <ProductItem key={_id}
                            _id={product._id}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            category={product.category}
                            buyPrice={product.buyPrice}
                            promotionPrice={product.promotionPrice}>
                        </ProductItem>
                    ))}
                </div>
            </div>
        </>
    )
}
