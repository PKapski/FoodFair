import React, {Component} from 'react';
import {Form} from 'react-bootstrap'
import './Products.css'
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import defaultImage from "../images/default-image.png"
import {ApiPaths, ImageSourcePrefix} from "./ProjectProperties"
import {getSupplierId, getToken} from "./api-authorization/AuthProvider"

class AddProduct extends Component {

    productCategories = ["Food", "Drink", "Other"];
    weightUnits = ["Piece", "G", "Dag", "Kg", "T", "L"]

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileUpdate = this.handleFileUpdate.bind(this);
        this.getFormTitle = this.getFormTitle.bind(this);
        
        this.state = {
            product: {
                category: this.productCategories[0],
                quantityUnit: this.weightUnits[0],
                imageId: null,
                supplierId: getSupplierId(), //TODO: change this to current supplier id
                currency: "USD", //TODO: change this to current user currency
            },
            FormFile: defaultImage,
        }
    }


    async componentDidMount() {
        const {match: {params}} = this.props;
        
        if (params.id != null) {
            const response = await fetch(ApiPaths.Products + "/" + params.id);
            const data = await response.json();

            this.setState({product: data});
            await this.fetchAndSetProductImage(data.imageId);
        }
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
            product: {
                ...this.state.product,
                [event.target.name]: event.target.value
            }
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {match: {params}} = this.props;

        if (params.id == null) {
            await this.postProduct();
        } else {
            await this.putProduct();
        }
        this.props.history.push("/me/products");
    }
    
    async postProduct() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken()},
            body: JSON.stringify(this.state.product),
        };
        await fetch(ApiPaths.Products, requestOptions);
    }
    
    async putProduct() {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken()},
            body: JSON.stringify(this.state.product),
        };
        await fetch(`${ApiPaths.Products}/${this.state.product.id}`, requestOptions);
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

    async handleFileUpdate(event) {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                FormFile: URL.createObjectURL(event.target.files[0])
            });

            const imageId = await this.postImageAndGetId(event.target.files[0]);
            this.setState({
                product: {
                    ...this.state.product,
                    imageId: imageId,
                }
            })
        }
    }
    
    getFormTitle() {
        const {match: {params}} = this.props;
        if (params.id == null) 
            return "Add product!";
        else 
            return "Edit product!";
    }
    
    render() {
        return (
            <div className="addContainer">
                <Row>
                    <Col/>
                    <Col>
                        <h1>{this.getFormTitle()}</h1>
                        <Form onSubmit={this.handleSubmit} onChange={this.changeHandler}>
                            <Form.Group>
                                <Form.Label>Name *</Form.Label>
                                <Form.Control
                                    required
                                    value={this.state.product.name}
                                    name="name"
                                    as="input"
                                    type="text"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description *</Form.Label>
                                <Form.Control
                                    required
                                    value={this.state.product.description}
                                    name="description"
                                    type="text"
                                    as="textarea"
                                    rows={3}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category *</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={this.state.product.category}
                                    name="category">
                                    {this.productCategories.map(prod => (
                                        <option value={prod}>{prod}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price *</Form.Label>
                                <Form.Control
                                    required
                                    value={this.state.product.price}
                                    as="input"
                                    type="number"
                                    name="price"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Total product quantity</Form.Label>
                                <Form.Control
                                    required
                                    value={this.state.product.totalQuantity}
                                    as="input"
                                    type="number"
                                    name="totalQuantity"/>
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Single stock</Form.Label>
                                    <Form.Control
                                        required
                                        value={this.state.product.singleStockQuantity}
                                        as="input"
                                        type="number"
                                        name="singleStockQuantity"/>
                                    <Form.Text muted>
                                        Single product quantity
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Unit</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={this.state.product.quantityUnit}
                                        name="quantityUnit">
                                        {this.weightUnits.map(unit => (
                                            <option value={unit}>{unit}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
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
        );
    }
}

export default AddProduct;