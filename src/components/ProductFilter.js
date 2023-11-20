import React, { useState } from 'react';

export default function ProductFilter({ onFilter }) {
    const [name, setName] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [types, setTypes] = useState([]);

    const handleTypeChange = (type) => {
        const updatedTypes = types.includes(type)
            ? types.filter(t => t !== type)
            : [...types, type];
        setTypes(updatedTypes);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onFilter({ name, minPrice, maxPrice, types });
    };

    // Inline styles
    const filterBoxStyle = {
        padding: '20px',
        backgroundColor: '#48D1CC', // Sea blue color
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        boxSizing: 'border-box'
    };

    const inputStyle = {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '10px'
    };

    const filterLabelStyle = {
        marginBottom: '5px'
    };

    const filterButtonStyle = {
        padding: '10px 20px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginTop: '10px'
    };


    return (
        <form onSubmit={handleSubmit} style={filterBoxStyle}>
            <div>
                <label style={filterLabelStyle}>
                    Product Name:
                    <input
                        style={inputStyle}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label style={filterLabelStyle}>
                    Min Price:
                    <input
                        style={inputStyle}
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </label>
                <label style={filterLabelStyle}>
                    Max Price:
                    <input
                        style={inputStyle}
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label style={filterLabelStyle}>
                    <input
                        type="checkbox"
                        value="Hybrid"
                        checked={types.includes('Hybrid')}
                        onChange={() => handleTypeChange('Hybrid')}
                    />
                    Hybrid
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Sativa"
                        checked={types.includes('Sativa')}
                        onChange={() => handleTypeChange('Sativa')}
                    />
                    Sativa
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Indica"
                        checked={types.includes('Indica')}
                        onChange={() => handleTypeChange('Indica')}
                    />
                    Indica
                </label>
            </div>
            <button type="submit" style={filterButtonStyle}>Lọc</button>
        </form>
    );
}
