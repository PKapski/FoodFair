import React, {Component} from 'react';
import ProductCard from "./ProductCard";
import {Container, Col, Spinner, Row} from "react-bootstrap";
import {ApiPaths} from "./ProjectProperties";

class ProductsList extends Component {
    state = {
        loading: true,
        products: []
    }
    
    async componentDidMount() {
        const response = await fetch(`${ApiPaths.Products}?showOnlyAvailable=true`);
        const data = await response.json();
        console.log(data);
        this.setState({products: data, loading: false});
    }
    
    render() {
        const spinnerStyle = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

        if (this.state.loading) {
            return (
                <div style={spinnerStyle}>
                    <Spinner animation="border" variant="success"/>
                </div>
            );
        } else if (!this.state.products.length) {
            return <h1> There are no products yet!</h1>
        }
        
        return (
                <Row className="productRow">
                    {this.state.products.map(product => (
                        <Col className="col-md-4" key={product.id}>
                            <ProductCard product={product} key={product.id} onAddCart={this.props.onAddCart}/>
                        </Col>
                    ))}
                </Row>
        );
    }
}

export default ProductsList;