import { Component } from "react";

class ProductItem extends Component {
    render() {
        return (
            <div className="col-6 col-sm-4">
                <div className="product-box card bg-light mb-3">
                    <div className="card-header">
                        <h5 className="card-title">
                            <a href="!">{this.props.name}</a>
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <a href="!">
                                <img
                                    className="card-img-top"
                                    alt="product"
                                    src={this.props.imageUrl}>
                                </img>
                            </a>
                        </div>
                        <p className="card-text description">{this.props.description}</p>
                        <p className="card-text">
                            <b>Type:</b>
                            {this.props.category}
                        </p>
                        <p className="card-text">
                            <b>Price:</b>
                            {this.props.buyPrice} $
                        </p>
                        <div className="add-cart-container">
                            <button type="button" className="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductItem;