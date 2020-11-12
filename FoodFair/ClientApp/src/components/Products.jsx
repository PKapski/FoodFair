import React, {Component} from 'react';
import ProductsHeader from "./ProductsHeader";
import ProductsList from "./ProductsList";
import "./Products.css"
import {Container} from "react-bootstrap";

class Products extends Component {


    render() {
        return (
            <Container>
                <ProductsHeader/>
                <ProductsList onAddCart={this.props.onAddCart}/>
            </Container>
        );
    }
}

export default Products;