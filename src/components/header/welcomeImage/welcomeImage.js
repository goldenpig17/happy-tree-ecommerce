import * as React from 'react';
import welcomeImage from "./images/welcomeImageNoBackground.png";

export default function WelcomeImage() {

    return (

        <img
            src={welcomeImage}
            alt="Welcome Images"
            style={{
                cursor: 'pointer',
                height: '200px',
                width: 'auto',
                marginTop: '5px', 
                marginBottom: '5px'
            }}
        />

    );
}
