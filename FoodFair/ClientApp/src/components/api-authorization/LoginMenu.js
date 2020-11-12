import React, {Component} from 'react';
import Nav from "react-bootstrap/Nav";
import {getSupplierName, isLoggedIn, logout} from './AuthProvider'
import {NavDropdown} from "react-bootstrap";

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }
    
    componentDidMount() {
        this.populateState();
    }

    populateState() {
        const [isAuthenticated, userName] = [isLoggedIn(), getSupplierName()];
        this.setState({
            isAuthenticated,
            userName
        });
    }

    render() {
        const {isAuthenticated, userName} = this.state;
        if (!isAuthenticated) {
            return this.anonymousView("/register", "/login");
        } else {
            return this.authenticatedView(userName, "/me/products", "/me/account/edit", "/");
        }
    }

    authenticatedView(userName, productsPath, profilePath, logoutPath) {
        return (
            <Nav>
                <NavDropdown title={`Hello ${userName}`} id="basic-nav-dropdown" className="text-white">
                    <NavDropdown.Item href={productsPath}>My products</NavDropdown.Item>
                    <NavDropdown.Item href={profilePath}>Account</NavDropdown.Item>
                    <NavDropdown.Item href={logoutPath} onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        );
    }

    anonymousView(registerPath, loginPath) {
        return (
            <Nav>
                <Nav.Link className="text-white" href={registerPath}>Become a supplier!</Nav.Link>
                <Nav.Link className="text-white" href={loginPath}>Login</Nav.Link>
            </Nav>
        );
    }
}
