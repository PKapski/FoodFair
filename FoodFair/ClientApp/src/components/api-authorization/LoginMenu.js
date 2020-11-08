import React, { Component, Fragment } from 'react';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import Nav from "react-bootstrap/Nav";

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    authenticatedView(userName, profilePath, logoutPath) {
        return (
            <Nav className="ml-auto" style={{marginLeft: "auto"}}>
                <Nav.Link className="text-white" href={profilePath}>Hello {userName}</Nav.Link>
                <Nav.Link className="text-white" href={logoutPath}>Logout</Nav.Link>
            </Nav>
        );

    }

    anonymousView(registerPath, loginPath) {
        return (<Fragment>
            <Nav>
                <Nav.Link className="text-white" href={registerPath}>Register</Nav.Link>
                <Nav.Link className="text-white" href={loginPath}>Login</Nav.Link>
            </Nav>
        </Fragment>);
    }
}
