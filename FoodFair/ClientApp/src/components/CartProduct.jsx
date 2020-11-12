import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";

class CartProduct extends Component {
    
    render() {
        return (
            <Row>
                <Col>{this.props.product.name}</Col>
                <Col>{this.props.product.supplierName}</Col>
                <Col>1</Col>
            </Row>
        );
    }
}

export default CartProduct;