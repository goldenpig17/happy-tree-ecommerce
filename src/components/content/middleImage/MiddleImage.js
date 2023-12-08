import React from 'react';
import middleImage from "./images/benefit.png";

const MiddleImage = ({ altText, leftText, rightText, maxWidth }) => {
    maxWidth = maxWidth || '100%';

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        flex: 1,
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
        flex: 2,
        padding: '0 10px' 
    };

    return (
        <div style={containerStyle}>
            <div style={textStyle}>
                <p>{leftText}</p>
            </div>
            <div style={imageContainerStyle}>
                <img src={middleImage} alt={altText} style={{ width: '100%', height: '500px' }} />
            </div>
            <div style={textStyle}>
                <p>{rightText}</p>
            </div>
        </div>
    );
};

export default MiddleImage;
