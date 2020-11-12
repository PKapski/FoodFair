import React, {Component} from 'react';
import {Spinner, Table, Button, Row, Container, Col} from "react-bootstrap";
import {ApiPaths} from "./ProjectProperties";
import {getSupplierId, getToken} from "./api-authorization/AuthProvider"
import './Products.css'
import ProductRow from "./ProductRow";
import {Link} from "react-router-dom";

class MyProducts extends Component {
    constructor(props) {
        super(props);
        this.handleProductDelete = this.handleProductDelete.bind(this);

        this.state = {
            loading: true,
            products: []
        }
    }

    async componentDidMount() {
        const response = await fetch(ApiPaths.Products + "?supplierId=" + getSupplierId());
        const data = await response.json();
        this.setState({products: data, loading: false});
    }

    async handleProductDelete(deletedId) {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Authorization': 'Bearer ' + getToken()}
        };
        
        const response = await fetch(ApiPaths.Products + "/" + deletedId, requestOptions);
        if (response.ok) {
            const products = this.state.products.filter(p => p.id !== deletedId);
            this.setState({products});
        } else {
            console.log(`Error deleting ${deletedId} product!`);
        }
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
            return (
                <React.Fragment>
                    <h1> You have no products yet!</h1>
                    <Link to='/me/products/add'>
                        <Button variant="success">Add new</Button>
                    </Link>
                </React.Fragment>);
        }

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Products</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="addNewButtonColumn">
                        <Link to='/me/products/add'>
                            <Button variant="success">Add new</Button>
                        </Link>
                    </Col>
                </Row>
                <Col>
                    <Table variant="secondary">
                        <tbody>
                        {this.state.products.map(product => (
                            <ProductRow product={product} onDelete={this.handleProductDelete}/>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Container>
        )
    }
}

export default MyProducts;