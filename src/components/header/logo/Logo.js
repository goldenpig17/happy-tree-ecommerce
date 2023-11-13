import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


export default function Logo() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  }
  return (
   
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color: "black"}} onClick={handleLogoClick}>
            Devcamp
          </Typography>

  );
}
