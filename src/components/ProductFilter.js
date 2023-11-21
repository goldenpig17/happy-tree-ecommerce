import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setMinPrice, setMaxPrice, setProductName } from '../actions/actions';
import { toggleProductType } from '../actions/actions';

export default function ProductFilter() {
    //const [name, setName] = useState('');
    //const [minPrice, setMinPrice] = useState('');
    //const [maxPrice, setMaxPrice] = useState('');
    //const [types, setTypes] = useState([]);

    const dispatch = useDispatch();

    const handleNameChange = (event) => {
        dispatch(setProductName(event.target.value));
    };

    const handleMaxPriceChange = (event) => {
        dispatch(setMaxPrice(event.target.value));
    };
    // Handle min price change
    const handleMinPriceChange = (event) => {
        dispatch(setMinPrice(event.target.value));
    };
    // Handle product type change
    const handleTypeChange = (type) => {
        dispatch(toggleProductType(type));
    };
    const selectedTypes = useSelector(state => state.filter.productType);
    const handleSubmit = (event) => {
        event.preventDefault();
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



    return (
        <form onSubmit={handleSubmit} style={filterBoxStyle}>
            <div>
                <label style={filterLabelStyle}>
                    Product Name:
                    <input
                        style={inputStyle}
                        type="text"
                        onChange={handleNameChange}
                    />
                </label>
            </div>
            <div>
                <label style={filterLabelStyle}>
                    Min Price:
                    <input
                        style={inputStyle}
                        type="number"
                        onChange={handleMinPriceChange}
                    />
                </label>
                <label style={filterLabelStyle}>
                    Max Price:
                    <input
                        style={inputStyle}
                        type="number"
                        onChange={handleMaxPriceChange}
                    />
                </label>
            </div>
            <div>
                {['Indica', 'Hybrid', 'Sativa'].map((type) => (
                    <label key={type}>
                        <input
                            type="checkbox"
                            value={type}
                            checked={selectedTypes.includes(type)}
                            onChange={() => handleTypeChange(type)}
                        />
                        {type}
                    </label>
                ))}
            </div>
        </form>
    );
}
