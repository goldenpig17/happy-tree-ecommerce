import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from "./images/logoNoBackground.png";

export default function Logo() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  }
  return (

    <img
      src={logoImage}
      alt="Happy Tree Logo"
      style={{
        cursor: 'pointer',
        height: '150px', // Đặt chiều cao cho logo
        width: 'auto',  // Chiều rộng tự động điều chỉnh theo tỉ lệ
        marginTop: '5px', // Có thể thêm margin nếu cần
        marginBottom: '5px'
      }} 
      onClick={handleLogoClick}
    />

  );
}
