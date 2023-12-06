import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import { LocationOnOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';

const GoogleMapFooter = ({ lat, lng }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ height: isMobile ? 100 : 200, width: '50%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAOUuv5zUkxjgUIm53idnrvYFYU5Lomh2w' }} 
        defaultCenter={{ lat, lng }}
        defaultZoom={11}
      >
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            padding: '10px',
            backgroundColor: 'white',
          }}
          lat={lat}
          lng={lng}
        >
          <Typography variant="caption">Chúng tôi ở đây!</Typography>
          <LocationOnOutlined color="primary" />
        </Paper>
      </GoogleMapReact>
    </Box>
  );
};

export default GoogleMapFooter;
