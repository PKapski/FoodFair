import React, {Component} from 'react';
import {MdAddShoppingCart} from 'react-icons/md'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {Button, Card, Container, Row} from "react-bootstrap";
import defaultImage from "../images/default-image.png"
import {ApiPaths} from "./ProjectProperties";

const IMAGE_SRC_PREFIX = "data:image/png;base64,";

class Product extends Component {
    state = {
        Image: defaultImage
    }

    getQuantityString(singleStockQuantity, quantityUnit) {
        if (singleStockQuantity === 1) {
            return quantityUnit;
        }

        let quantityString = singleStockQuantity + " ";
        quantityString += this.getQuantityUnit(quantityUnit);
        return quantityString;
    }

    getQuantityUnit(quantityUnit) {
        return quantityUnit === "Piece" ? "Pieces" : quantityUnit;
    }

    async componentDidMount() {
        const {imageId} = this.props.product;
        if (imageId === null) {
            return;
        }
        let base64Image = await this.fetchBase64ImageData(imageId);
        base64Image = IMAGE_SRC_PREFIX + this.getResponseWithoutQuotes(base64Image);
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

    render() {
        const {name, supplierName, price, currency, singleStockQuantity, quantityUnit} = this.props.product;
        
        return (
            <Card border="success" className="mb-4 shadow">
                <Card.Img variant="top" src={this.state.Image} className="border-bottom"/>
                <Card.Body>
                    <Card.Text className="text-muted">
                        {supplierName}
                    </Card.Text>
                    <Card.Title>
                        {name}
                    </Card.Title>
                </Card.Body>
                <Card.Footer>
                    <Container>
                        <Row className="justify-content-between align-items-center">
                            <div>
                                <a> {price} {currency}</a>
                                <a className="text-muted quantityText"> /{this.getQuantityString(singleStockQuantity, quantityUnit)}</a>
                            </div>
                            <a href="#" className="stretched-link"/>
                            {/*<small className="text-muted">9 mins</small>*/}
                            <OverlayTrigger delay={{show: 200, hide: 200}} trigger="hover" placement="top" overlay={
                                <Tooltip id="button-tooltip">
                                    Add to cart
                                </Tooltip>}>
                                <Button className="buyButton" variant="outline-success" ref="#"><MdAddShoppingCart
                                    size={25}/></Button>
                            </OverlayTrigger>
                        </Row>
                    </Container>
                </Card.Footer>
            </Card>);
    }

}

export default Product;