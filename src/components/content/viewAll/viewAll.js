import * as React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function ViewAll() {
    const navigate = useNavigate();

    const handleViewAllClick =() => {
        navigate("/products");
    }

    return (
        <>
            <Box textAlign="center">
                <Button variant="contained" size="medium" disableElevation onClick={handleViewAllClick}>
                    View All
                </Button>
            </Box>
        </>
    )
}
