import * as React from 'react';
import { useEffect, useState } from "react";
import ProductItem from './content/lastestProducts/ProductItem';
import { Link } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState([]);

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
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, []);

    return (
        <>
            <Link to="/">Home</Link>
            <div className="container main-container">
                <div className='row'>
                    {products.slice(0, 6).map((product, _id) => (
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
        </>
    )
}
