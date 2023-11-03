import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from 'react-bootstrap/Carousel';
import blueDreamImage from "./images/blue-dream.png";
import gelatoImage from "./images/gelato.jpg";
import ogKushImage from "./images/og-kush.png";


export default function CarouselSlider() {
    return (
        <>
            <Carousel data-bs-theme="dark">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={blueDreamImage}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h5>BLUE DREAM</h5>
                        <p>Blue Dream is a sativa-dominant hybrid marijuana strain made by crossing Blueberry with Haze.</p>
                        <div>
                            <a href='!' className="text-uppercase custom_orange-btn text-center">Shop Now</a>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={gelatoImage}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h5>GELATO</h5>
                        <p>Gelato, also known as Larry Bird and Gelato #42 is an evenly-balanced hybrid marijuana strain made from a crossing of Sunset Sherbet and Thin Mint Girl Scout Cookies. With its balance of indica & sativa, this strain produces a euphoric high accompanied by strong feelings of relaxation.</p>
                        <div>
                            <a href='!' className="text-uppercase custom_orange-btn text-center">Shop Now</a>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={ogKushImage}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h5>OG KUSH</h5>
                        <p>
                        OG Kush, also known as Premium OG Kush, was first cultivated in Florida in the early ‘90s when a marijuana strain from Northern California was supposedly crossed with Chemdawg, Lemon Thai and a Hindu Kush plant from Amsterdam.
                        </p>
                        <div>
                            <a href='!' className="text-uppercase custom_orange-btn text-center">Shop Now</a>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}
