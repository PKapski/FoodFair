import React, {Component} from 'react';
import {Badge, Button, Container, Nav, Navbar} from 'react-bootstrap';
import './NavMenu.css';
import {LoginMenu} from "./api-authorization/LoginMenu";
import {MdAddShoppingCart} from "react-icons/md";
import {IconContext} from "react-icons";

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
                                <Nav.Link className="text-white" href="/products">Browse products</Nav.Link>
                            </Nav>
                            <Button variant="outline-light" className="cart-nav-button" href="/cart">
                                <IconContext.Provider value={{className: "navbar-shopping-cart"}}>
                                    <MdAddShoppingCart size={20}/>
                                </IconContext.Provider>
                                <Badge pill variant="success">{this.props.cartCount}</Badge>
                            </Button>
                            <LoginMenu/>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
