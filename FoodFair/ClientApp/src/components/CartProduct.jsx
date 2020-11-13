import React, {Component} from 'react';
import {Button, Image} from "react-bootstrap";
import defaultImage from "../images/default-image.png";
import {getQuantityString} from "./QuantityUtils"
import {ApiPaths, ImageSourcePrefix} from "./ProjectProperties";

class CartProduct extends Component {

    constructor(props) {
        super(props);
        this.decrementProductCount = this.decrementProductCount.bind(this);
        this.incrementProductCount = this.incrementProductCount.bind(this);

        this.state = {
            Image: defaultImage,
            productCount: 1
        }
    }

    async componentDidMount() {
        const {imageId} = this.props.product;
        if (imageId === null) {
            return;
        }
        let base64Image = await this.fetchBase64ImageData(imageId);
        base64Image = ImageSourcePrefix + this.getResponseWithoutQuotes(base64Image);
        this.setState({Image: base64Image});
    }

    async fetchBase64ImageData(imageId) {
        const requestOptions = {
            method: 'GET'
        };
        return await fetch(ApiPaths.Images + "/" + imageId, requestOptions)
            .then(response => response.text());
    }

    getResponseWithoutQuotes(base64Image) {
        return base64Image.replace(/['"]+/g, '');
    }
    
    decrementProductCount() {
        let productCount = this.state.productCount - 1;
        if (productCount === 0) {
            this.props.onProductDelete(this.props.product.id);
        }
        this.setState({productCount});
    }

    incrementProductCount() {
        let productCount = this.state.productCount + 1;
        this.setState({productCount});
    }
    
    render() {

        const {id, name, price, currency, singleStockQuantity, quantityUnit} = this.props.product;

        return (
            <tr key={id}>
                <td className="imageTableColumn"><Image src={this.state.Image} fluid/></td>
                <td>{name}</td>
                <td>{price} {currency} /{getQuantityString(singleStockQuantity, quantityUnit)}</td>
                <td>
                    <Button variant="primary" className="btn-circle" onClick={this.decrementProductCount}>-</Button>
                </td>
                <td>{this.state.productCount}</td>
                <td>
                    <Button variant="primary" className="btn-circle" onClick={this.incrementProductCount}>+</Button>
                </td>
                <td>{price*this.state.productCount} {currency}</td>
                <td> <Button variant="danger" onClick={() => this.props.onProductDelete(id)}>Remove</Button></td>
            </tr>
        );
    }
}

export default CartProduct;