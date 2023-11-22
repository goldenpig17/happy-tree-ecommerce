import React, { useState, useEffect } from 'react';

const CartPage = () => {
    // Initialize cart from local storage
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        const parsedCart = savedCart ? JSON.parse(savedCart) : [];
        // Ensure each product has a valid price and quantity
        return parsedCart.map(item => ({
            ...item,
            price: item.price || 0,
            quantity: item.quantity || 1,
        }));
    });

    // Calculate the total price of the cart
    const calculateTotal = (cart) => {
        return cart.reduce((total, item) => {
            const itemPrice = item.price || 0;
            const itemQuantity = item.quantity || 0;
            return total + itemPrice * itemQuantity;
        }, 0).toFixed(2);
    };

    // State for the total price of the cart
    const [totalPrice, setTotalPrice] = useState(() => calculateTotal(cart));

    // Update the total price when the cart changes
    useEffect(() => {
        setTotalPrice(calculateTotal(cart));
    }, [cart]);

    // Function to handle quantity changes
    const handleQuantityChange = (_id, increment) => {
        const updatedCart = cart.map(item => {
            if (item._id === _id) {
                const updatedQuantity = increment ? item.quantity + 1 : Math.max(item.quantity - 1, 0);
                return { ...item, quantity: updatedQuantity };
            }
            return item;
        }).filter(item => item.quantity > 0); // Loại bỏ sản phẩm nếu số lượng là 0
        setCart(updatedCart);
        console.log(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <>
            <h1>Shopping Cart</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>${(product.price || 0).toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleQuantityChange(product._id, false)}>-</button>
                                <span>{product.quantity}</span>
                                <button onClick={() => handleQuantityChange(product._id, true)}>+</button>
                            </td>
                            <td>${((product.price || 0) * (product.quantity || 0)).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <strong>Cart Total: ${totalPrice}</strong>
            </div>
        </>
    );
};

export default CartPage;
