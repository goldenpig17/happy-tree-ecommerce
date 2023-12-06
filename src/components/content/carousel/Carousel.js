import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';
import blueDreamImage from "./images/blue-dream.png";
import gelatoImage from "./images/gelato.jpg";
import ogKushImage from "./images/og-kush.png";
import "./customCarousel.css";


export default function CarouselSlider() {
    return (
        <>
        <div className="carousel-container">
            <Carousel data-bs-theme="dark">
                <Carousel.Item >
                    <div className="carousel-caption-container">
                        <Carousel.Caption>
                            <h5>BLUE DREAM</h5>
                            <p>Blue Dream is a sativa-dominant hybrid marijuana strain made by crossing Blueberry with Haze.</p>
                        </Carousel.Caption>
                    </div>
                    <div className="carousel-image-container">
                        <img
                            className="carousel-image"
                            src={blueDreamImage}
                            alt="First slide"
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item >
                    <div className="carousel-caption-container">
                        <Carousel.Caption>
                            <h5>GELATO</h5>
                            <p>Gelato produces a euphoric high accompanied by strong feelings of relaxation.</p>
                        </Carousel.Caption>
                    </div>
                    <div className="carousel-image-container">
                        <img
                            className="carousel-image"
                            src={gelatoImage}
                            alt="Second slide"
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item >
                    <div className="carousel-caption-container">
                        <Carousel.Caption>
                            <h5>OG KUSH</h5>
                            <p> OG Kush was first cultivated in Florida in the early 90s.</p>                   
                        </Carousel.Caption>
                    </div>
                    <div className="carousel-image-container">
                        <img
                            className="carousel-image"
                            src={ogKushImage}
                            alt="Third slide"
                        />
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
            
        </>
    )
}
