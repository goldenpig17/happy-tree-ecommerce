import { Component } from "react";
import CarouselSlider from "./carousel/Carousel";
import LatestProducts from "./lastestProducts/LatestProducts";
import ViewAll from "./viewAll/viewAll";
import MiddleImage from "./middleImage/MiddleImage";

class Content extends Component {
    render() {
        const leftTextContent = [
            "Giảm Đau và Viêm",
            "Điều Trị Bệnh Tâm Thần",
            "Hỗ Trợ Điều Trị Ung Thư",
            "Cải Thiện Giấc Ngủ"
        ];

        const rightTextContent = [
            "Giảm Căng Thẳng và Lo Âu",
            "Cải Thiện Sự Tập Trung và Sáng Tạo",
            "Kiểm Soát Cơn Co Giật",
            "Hỗ Trợ Cai Nghiện"
        ];

        const textStyle = {
            flex: 1,
            padding: '0 10px', // Add some padding around the text
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

        return (
            <>
                <CarouselSlider></CarouselSlider>
                <MiddleImage
                    altText="Benefits"
                    leftText={leftTextContent.map((text, index) => (
                        <p key={index} style={textStyle}>{text}</p>
                    ))}
                    rightText={rightTextContent.map((text, index) => (
                        <p key={index} style={textStyle}>{text}</p>
                    ))}
                    maxWidth="1300px"
                />
                <LatestProducts></LatestProducts>
                <ViewAll></ViewAll>
            </>
        )
    }
}

export default Content;