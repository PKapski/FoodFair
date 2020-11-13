import React, {Component, Fragment} from 'react';
import {MdAddShoppingCart} from 'react-icons/md'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {Button, Card, Container, Row} from "react-bootstrap";
import defaultImage from "../images/default-image.png"
import {ApiPaths, ImageSourcePrefix} from "./ProjectProperties";
import { Link } from 'react-router-dom';
import AddedToCartModal from "./AddedToCartModal";
import {getQuantityString} from "./QuantityUtils"

class Product extends Component {
    constructor(props) {
        super(props);
        this.handleModalExit = this.handleModalExit.bind(this);
        this.onAddToCartClick = this.onAddToCartClick.bind(this);
        
        this.state = {
            Image: defaultImage,
            smShow: false
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
    
    handleModalExit() {
        this.setState({smShow: false});
    }

    onAddToCartClick(id) {
        this.props.onAddCart(id);
        this.setState({smShow: true});
    }
    
    render() {
        const {id, name, supplierName, price, currency, singleStockQuantity, quantityUnit} = this.props.product;
        
        return (
            <Fragment>
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
                                    <a className="text-muted quantityText"> /{getQuantityString(singleStockQuantity, quantityUnit)}</a>
                                </div>
                                <Link to={`/products/${id}`} className="stretched-link"/>
                                <OverlayTrigger delay={{show: 200, hide: 200}} placement="top" overlay={
                                    <Tooltip id="button-tooltip">
                                        Add to cart
                                    </Tooltip>}>
                                    <Button className="buyButton" variant="outline-success" onClick={() => this.onAddToCartClick(id)}><MdAddShoppingCart
                                        size={25}/></Button>
                                </OverlayTrigger>
                            </Row>
                        </Container>
                    </Card.Footer>
                </Card>
                <AddedToCartModal name={name} show={this.state.smShow} onModalExit={this.handleModalExit}/>
            </Fragment>);
    }

}

export default Product;