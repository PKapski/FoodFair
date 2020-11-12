import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import './Cart.css'
import {Col, Row, Spinner} from "react-bootstrap";
import {ApiPaths} from "./ProjectProperties";
import CartProduct from "./CartProduct";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    async componentDidMount() {
        const response = await fetch(ApiPaths.Products);
        const data = await response.json();
        console.log(data);
        this.setState({products: data, loading: false});
    }

    render() {
        const spinnerStyle = {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"};

        if (this.state.loading) {
            return (
                <div style={spinnerStyle}>
                    <Spinner animation="border" variant="success"/>
                </div>
            );
        } else if (!this.state.products.length) {
            return <h1> Your cart is empty. Add some products!</h1>
        }

        return (
            <Container className="cartContainer">
                <h1>Cart</h1>
                <Row className="mainCartRow">
                    <Col>
                        {this.state.products.map(product => (
                            <CartProduct product={product}/>
                        ))}
                    </Col>
                </Row>
                <Row className="cartSummaryRow"/>
            </Container>
        );
    }
}

export default Cart;