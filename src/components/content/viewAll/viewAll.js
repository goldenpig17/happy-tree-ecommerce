import * as React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function ViewAll() {
    const navigate = useNavigate();

    const handleViewAllClick = () => {
        navigate("/products");
    }

    const buttonStyle = {
        backgroundColor: '#fef7d0',
        '&:hover': {
            backgroundColor: '#388E3C',
        },
        fontFamily: "'Happy Monkey', sans-serif",
        fontSize: 'larger',
        color: '#01723e',
        fontweight: 'bolder',
        cursor: 'pointer',
        margin: '20px 0',
    };

    return (
        <>
            <Box textAlign="center" sx={{ padding: 2 }}>
                <Button
                    variant="contained"
                    size="large"
                    disableElevation
                    onClick={handleViewAllClick}
                    sx={buttonStyle}
                >
                    Xem Tất Cả Sản Phẩm
                </Button>
            </Box>
        </>
    )
}
