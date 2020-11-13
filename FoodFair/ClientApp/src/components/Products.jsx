import React, {Component} from 'react';
import ProductsHeader from "./ProductsHeader";
import ProductsList from "./ProductsList";
import "./Products.css"
import {Container} from "react-bootstrap";
import {ApiPaths} from "./ProjectProperties";

class Products extends Component {
    constructor(props) {
        super(props);
        this.handleNameFilterChange = this.handleNameFilterChange.bind(this);
        
        this.state = {
            loading: true,
            products: [],
            nameFilter: ""
        }
    }
    
    handleNameFilterChange(event) {
        this.setState({nameFilter: event.target.value});
    }
    
    async componentDidMount() {
        const response = await fetch(`${ApiPaths.Products}?showOnlyAvailable=true`);
        const data = await response.json();
        console.log(data);
        this.setState({products: data, loading: false});
    }

    render() {
        return (
            <Container>
                <ProductsHeader onNameFilterChange={this.handleNameFilterChange}/>
                <ProductsList onAddCart={this.props.onAddCart} 
                              isLoading={this.state.loading} 
                              products={this.state.products.filter(p=>p.name.toLowerCase().includes(this.state.nameFilter.toLowerCase()))}/>
            </Container>
        );
    }
}

export default Products;