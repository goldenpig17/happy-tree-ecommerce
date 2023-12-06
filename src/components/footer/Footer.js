import { Component } from "react";
import ServiceFooter from "./servicesFooter/ServicesFooter";
import SocialFooter from "./SocialFooter/SocialFooter";
import "bootstrap/dist/css/bootstrap.min.css";
import GoogleMapFooter from "./mapFooter/GoogleMapFooter";


class Footer extends Component {
    render() {
        return (
            <>
                <section
                    className="info_section layout_padding"
                    style={{
                        borderTop: '3px solid #f0f0f0',
                        background: '#f6efc3',
                        padding: '40px 0',
                        marginTop: '30px',
                        color: 'green'
                    }}
                >
                    <div className="container text-center">
                        <div className="row">
                            <GoogleMapFooter lat={21.03877067565918} lng={105.82940673828125} />
                            <ServiceFooter></ServiceFooter>
                            <SocialFooter></SocialFooter>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Footer;