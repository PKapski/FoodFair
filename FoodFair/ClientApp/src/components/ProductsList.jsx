import React, {Component} from 'react';
import ProductCard from "./ProductCard";
import {Col, Row, Spinner} from "react-bootstrap";

class ProductsList extends Component {
    render() {
        const spinnerStyle = {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"};

        if (this.props.isLoading) {
            return (
                <div style={spinnerStyle}>
                    <Spinner animation="border" variant="success"/>
                </div>
            );
        } else if (!this.props.products.length) {
            return <h1> There are no products yet!</h1>
        }

        return (
            <Row className="productRow">
                {this.props.products.map(product => (
                    <Col className="col-md-4" key={product.id}>
                        <ProductCard product={product} key={product.id} onAddCart={this.props.onAddCart}/>
                    </Col>
                ))}
            </Row>
        );
    }
}

export default ProductsList;