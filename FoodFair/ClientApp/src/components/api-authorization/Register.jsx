import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Form, Spinner} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import defaultImage from "../../images/default-image.png"
import {ApiPaths, ImageSourcePrefix} from "../ProjectProperties";
import {getSupplierId, getToken, isLoggedIn, logout} from "./AuthProvider";

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileUpdate = this.handleFileUpdate.bind(this);

        this.state = {
            supplier: {
                password: "",
                repeatPassword: ""
            },
            ErrorMessage: "",
            FormFile: defaultImage,
            loading: true
        }
    }

    async componentDidMount() {
        if (isLoggedIn()) {
            const requestOptions = {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + getToken()},
            };
            const response = await fetch(ApiPaths.Suppliers + "/" + getSupplierId(), requestOptions);
            const data = await response.json();

            this.setState({supplier: data});
            await this.fetchAndSetProductImage(data.imageId);
        }
        this.setState({loading: false});
    }

    async fetchAndSetProductImage(imageId) {
        if (imageId === null) {
            return;
        }

        let base64Image = await this.fetchBase64ImageData(imageId);
        base64Image = ImageSourcePrefix + this.getResponseWithoutQuotes(base64Image);

        this.setState({FormFile: base64Image});
    }

    async fetchBase64ImageData(imageId) {
        const requestOptions = {
            method: 'GET'
        };
        return await fetch(ApiPaths.Images + "/" + imageId, requestOptions)
            .then(response => response.text());
    }

    getResponseWithoutQuotes(base64Image) {
        return base64Image.replace(/['"]+/g, '');
    }

    changeHandler = (event) => {
        this.setState({
            supplier: {
                ...this.state.supplier,
                [event.target.name]: event.target.value
            }
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        if (this.state.supplier.password !== this.state.supplier.repeatPassword) {
            this.setState({ErrorMessage: "Passwords must be the same!"});
            return;
        }

        if (isLoggedIn()) {
            await this.putSupplier();
        } else {
            if (!this.state.supplier.password) {
                this.setState({ErrorMessage: "Password cannot be empty!"});
                return;
            }
            await this.postSupplier();
        }
    }

    async postSupplier() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.supplier),
        };
        
        await fetch(ApiPaths.Register, requestOptions)
            .then(this.checkError)
            .then(() => {
                console.log("JESTEM");
                this.props.history.push("/login")
            })
            .catch(err => this.handleError(err));
    }

    async putSupplier() {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken()},
            body: JSON.stringify(this.state.supplier),
        };
        await fetch(`${ApiPaths.Suppliers}/${this.state.supplier.id}`, requestOptions)
            .then(this.checkError)
            .then(() => {
                logout();
                this.props.history.push('/login');
            })
            .catch(err => this.handleError(err));
    }

    async handleFileUpdate(event) {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                FormFile: URL.createObjectURL(event.target.files[0])
            });

            const imageId = await this.postImageAndGetId(event.target.files[0]);
            this.setState({
                supplier: {
                    ...this.state.supplier,
                    imageId: imageId,
                }
            })
        }
    }

    async postImageAndGetId(image) {
        const formData = new FormData();
        formData.append('formFile', image);
        const requestOptions = {
            method: 'POST',
            body: formData
        };

        const data = await fetch(ApiPaths.Images, requestOptions);
        return data.text();
    }

    getFormTitle() {
        if (isLoggedIn())
            return "Edit account!";
        else
            return "Register!";
    }

    render() {
        const spinnerStyle = {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"};

        if (this.state.loading) {
            return (
                <div style={spinnerStyle}>
                    <Spinner animation="border" variant="success"/>
                </div>
            );
        }

        return (
            <div>
                <div className="addContainer">
                    <Row>
                        <Col/>
                        <Col>
                            <h1>{this.getFormTitle()}</h1>
                            <Form onSubmit={this.handleSubmit} onChange={this.changeHandler}>
                                <Form.Group>
                                    <Form.Control
                                        required
                                        value={this.state.supplier.name}
                                        name="name"
                                        as="input"
                                        type="text"
                                        placeholder="Supplier name *"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        required
                                        value={this.state.supplier.description}
                                        name="description"
                                        type="text"
                                        as="textarea"
                                        placeholder="Say something about you"
                                        rows={3}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        value={this.state.supplier.email}
                                        type="email"
                                        placeholder="Enter email *"
                                        name="Email"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        value={this.state.supplier.phoneNumber}
                                        type="tel"
                                        pattern="[+0-9]{1,12}"
                                        placeholder="Phone number *"
                                        name="phoneNumber"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password *"
                                        name="password"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type="password"
                                        placeholder="Repeat password *"
                                        name="repeatPassword"
                                    />
                                </Form.Group>
                                <p className="text-danger">{this.state.ErrorMessage}</p>
                                <Form.Group>
                                    <Form.File
                                        accept="image/*"
                                        name="image"
                                        onChange={this.handleFileUpdate}/>
                                    <Form.Text muted>
                                        Product image
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="success" type="submit" className="submitButton" size="lg">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                        <Col className="imageColumn">
                            <Image src={this.state.FormFile} thumbnail/>
                        </Col>

                    </Row>

                </div>
            </div>
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

        if (err.message === '500')
            message = "Username or email already taken."
        else if (err.message === '401')
            this.props.history.push('/login');
        else
            message = "Unexpected error occured";

        this.setState({ErrorMessage: message});
    }

}

export default Register;