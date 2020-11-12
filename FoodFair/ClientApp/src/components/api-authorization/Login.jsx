import React, {Component, useCallback} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import './Login.css'
import {ApiPaths} from '../ProjectProperties'
import {login, isLoggedIn} from './AuthProvider'
import {Redirect} from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            Email: "",
            Password: "",
            ErrorMessage: ""
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }

        await fetch(ApiPaths.Login, requestOptions)
            .then(this.checkError)
            .then(async response => {
                response = await response.json();
                login(response);
                this.props.history.go(0);
            })
            .catch(err => this.handleError(err));
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {

        if (isLoggedIn()) {
            return <Redirect to='/me/products'/>
        }
        
        return (
            <Container className="loginContainer" onChange={this.changeHandler}>
                <h1>Please sign in</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="Email"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="Password"
                        />
                    </Form.Group>
                    <p className="text-danger">{this.state.ErrorMessage}</p>
                    <Button
                        variant="success"
                        type="submit"
                        block>
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }

    checkError(response) {
        console.log(response);
        if (!response.ok) {
            throw Error(response.status);
        }
        return response;
    }

    handleError(err) {
        let message;

        if (err.message === '400')
            message = "Invalid username or/and password."
        else
            message = "Unexpected error occured";
        
        this.setState({ErrorMessage: message});
    }
}

export default Login;