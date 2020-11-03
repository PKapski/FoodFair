import React, {Component} from 'react';
import ProductsHeader from "./ProductsHeader";
import ProductsList from "./ProductsList";
import "./Products.css"

class Products extends Component {
    
    
    render() {
        return (
            <div class="container">
                <ProductsHeader/>
                <ProductsList/>
            </div>
        );
    }
}

export default Products;