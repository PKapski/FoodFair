import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import './Cart.css'
import {Button, Col, Row, Spinner, Table} from "react-bootstrap";
import {ApiPaths} from "./ProjectProperties";
import CartProduct from "./CartProduct";
import {getCart, clearCart, removeFromCart} from "./CartUtils"

class Cart extends Component {
    
    constructor(props) {
        super(props);
        this.clearCart = this.clearCart.bind(this);
        this.handleProductDelete = this.handleProductDelete.bind(this);

        this.state = {
            products: []
        }
    }
    
    async componentDidMount() {
        let url = `${ApiPaths.Products}?`;
        const cart = getCart();
        if (cart.length > 0) {
            cart.forEach(prodId => url += `productIds=${prodId}&`);
            url = url.slice(0,-1);
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            this.setState({products: data, loading: false});
        } else {
            this.setState({loading: false});
        }
    }

    clearCart() {
        this.setState({products: []});
        clearCart();
        this.props.onCartCountChange(0);
    }

    handleProductDelete(id) {
        const products = this.state.products.filter(p => p.id !== id);
        removeFromCart();
        this.props.onCartCountChange(products.length);
        this.setState({products});
        
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
                        <Table>
                            {this.state.products.map(product => (
                                <CartProduct product={product} onProductDelete={this.handleProductDelete}/>
                            ))}
                            <tr>
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                                <td><Button variant="success" onClick={this.clearCart}>Place an order!</Button></td>
                            </tr>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default Cart;