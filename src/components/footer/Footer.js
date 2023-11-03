import { Component } from "react";
import ProductFooter from "./productFooter/ProductFooter";
import ServiceFooter from "./servicesFooter/ServicesFooter";
import SupportFooter from "./supportFooter/SupportFooter";
import SocialFooter from "./SocialFooter/SocialFooter";
import "bootstrap/dist/css/bootstrap.min.css";


class Footer extends Component {
    render() {
        return (
            <>
                <section className="info_section layout_padding">
                    <div className="container text-center">
                        <div className="row">
                            <ProductFooter></ProductFooter>
                            <ServiceFooter></ServiceFooter>
                            <SupportFooter></SupportFooter>
                            <SocialFooter></SocialFooter>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Footer;