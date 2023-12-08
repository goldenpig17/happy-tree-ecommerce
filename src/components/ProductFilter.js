import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setMinPrice, setMaxPrice, setProductName, toggleProductType } from '../actions/actions';
import { Checkbox, FormControlLabel, FormGroup, TextField, Typography, Box } from '@mui/material';

export default function ProductFilter() {
    const dispatch = useDispatch();
    const selectedTypes = useSelector(state => state.filter.productType);

    const handleNameChange = (event) => {
        dispatch(setProductName(event.target.value));
    };

    const handleMaxPriceChange = (event) => {
        dispatch(setMaxPrice(event.target.value));
    };

    const handleMinPriceChange = (event) => {
        dispatch(setMinPrice(event.target.value));
    };

    const handleTypeChange = (type) => {
        dispatch(toggleProductType(type));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const labelStyle = {
        fontWeight: 'bold',
        fontFamily: "'Happy Monkey', sans-serif",
        color: '#000', 
    };

    const inputStyle = {
        backgroundColor: '#fff', 
        borderRadius: '4px',
    };

    return (
        <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{
                padding: '20px', 
                backgroundColor: '#48D1CC', 
                borderRadius: '8px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '10px'
            }}
        >
            <Typography variant="subtitle1" component="div" sx={labelStyle}>
                Tên sản phẩm:
            </Typography>
            <TextField
                variant="outlined"
                onChange={handleNameChange}
                size="small"
                margin="dense"
                sx={inputStyle}
            />

            <Typography variant="subtitle1" component="div" sx={labelStyle}>
                Giá thấp nhất:
            </Typography>
            <TextField
                variant="outlined"
                type="number"
                onChange={handleMinPriceChange}
                size="small"
                margin="dense"
                sx={inputStyle}
            />

            <Typography variant="subtitle1" component="div" sx={labelStyle}>
                Giá cao nhất:
            </Typography>
            <TextField
                variant="outlined"
                type="number"
                onChange={handleMaxPriceChange}
                size="small"
                margin="dense"
                sx={inputStyle}
            />

            <FormGroup>
                {['Indica', 'Hybrid', 'Sativa'].map((type) => (
                    <FormControlLabel
                        key={type}
                        control={
                            <Checkbox
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleTypeChange(type)}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: '1.5rem' } }} 
                            />
                        }
                        label={<Typography sx={{ ...labelStyle, display: 'inline' }}>{type}</Typography>}
                    />
                ))}
            </FormGroup>
        </Box>
    );
}
