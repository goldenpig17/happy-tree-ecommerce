import { Component } from "react";
import CarouselSlider from "./carousel/Carousel";
import LatestProducts from "./lastestProducts/LatestProducts";
import ViewAll from "./viewAll/viewAll";

class Content extends Component {
    render() {
        return(
            <>
            <CarouselSlider></CarouselSlider>
            <LatestProducts></LatestProducts>
            <ViewAll></ViewAll>
            </>
        )
    }
}

export default Content;