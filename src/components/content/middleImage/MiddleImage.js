import React from 'react';
import middleImage from "./images/benefit.png";

const MiddleImage = ({ altText, leftText, rightText, maxWidth }) => {
    maxWidth = maxWidth || '100%';

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column', // Children sẽ được xếp theo chiều dọc
        alignItems: 'center', // Căn giữa theo chiều ngang
        justifyContent: 'center', // Căn giữa theo chiều dọc
        backgroundColor: '#faf1d7',
        padding: '20px',
        maxWidth: maxWidth,
        margin: 'auto',
        borderRadius: '15px',
        border: '1px solid #ccc',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '30px'
    };

    const textStyle = {
        flex: '1 100%',
        padding: '0 10px',
        textAlign: 'center',
        fontFamily: "'Happy Monkey', sans-serif",
        fontSize: '30px',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        color: "#3b9107",
        margin: "10px 0",
        borderBottom: '1px solid #4CAF50',
        paddingBottom: '5px'
    };

    const imageContainerStyle = {
        width: '100%', // Bạn có thể đặt một giá trị cụ thể nếu muốn
        textAlign: 'center',
    };

    // Responsive image style
    const imageStyle = {
        width: '100%',
        height: 'auto', // Tự động điều chỉnh chiều cao để giữ nguyên tỉ lệ
        
    };

    return (
        <div style={containerStyle}>
            <div style={textStyle}>
                <p>{leftText}</p>
            </div>
            <div style={imageContainerStyle}>
                <img src={middleImage} alt={altText}  style={imageStyle} />
            </div>
            <div style={textStyle}>
                <p>{rightText}</p>
            </div>
        </div>
    );
};

export default MiddleImage;
