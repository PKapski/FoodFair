import React, {Component} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import './NavMenu.css';
import {LoginMenu} from "./api-authorization/LoginMenu";

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };
    }

    render() {
        return (
            <header>
                <Navbar className="border-bottom box-shadow mb-3" bg="success" expand="lg">
                    <Container>
                        <Navbar.Brand className="text-white" href="/">FoodFair</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                            <Nav>
                                <Nav.Link className="text-white" href="/products">Products</Nav.Link>
                                <Nav.Link className="text-white" href="/suppliers">Suppliers</Nav.Link>
                                <Nav.Link className="text-white" href="/me/products/add">Add Product</Nav.Link>
                            </Nav>
                            <LoginMenu/>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
