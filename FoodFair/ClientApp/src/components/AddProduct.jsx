import React, {Component} from 'react';
import {Form} from 'react-bootstrap'
import './Products.css'
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class AddProduct extends Component {

    productCategories = ["Food", "Drink", "Other"];
    weightUnits = ["None", "G", "Dag", "Kg", "T",]


    constructor(props, context) {
        super(props, context);
        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.state = {
            Category: this.productCategories[0],
            QuantityUnit: this.weightUnits[0],
            ImageId: null,
            SupplierId: 4, //TODO: change this to current supplier id
            Currency: "USD", //TODO: change this to current user currency
            FormFile: null
        }
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleAddProduct(event)  {
        event.preventDefault();
        const imageId = await this.postImageAndGetId();
        this.setState({
            imageId: imageId,
            FormFile: undefined
        });
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        };
        const data = await fetch('/product', requestOptions);
        let changeUrl = data.headers.get("Location");
        const tokens = changeUrl.split('/').slice(3);
        changeUrl = '/' + tokens.join('/');
        this.props.history.push(changeUrl);
    }
    
    async postImageAndGetId() {
        const formData = new FormData();
        formData.append('formFile', this.state.FormFile);
        const requestOptions = {
            method: 'POST',
            body: formData
        };

        const data = await fetch("/image", requestOptions);
        return data.text();
    }
    
    saveFile = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            FormFile: event.target.files[0]
        })
    }

    render() {
        return (
            <div className="addContainer">
                <h1>Add Product!</h1>
                <Form onSubmit={this.handleAddProduct} onChange={this.changeHandler}>
                    <Form.Group>
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                            required
                            name="Name"
                            as="input"
                            type="text"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description *</Form.Label>
                        <Form.Control
                            required
                            name="Description"
                            type="text"
                            as="textarea"
                            rows={3}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category *</Form.Label>
                        <Form.Control
                            as="select"
                            name="Category">
                            {this.productCategories.map(prod => (
                                <option value={prod}>{prod}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price *</Form.Label>
                        <Form.Control
                            required
                            as="input"
                            type="number"
                            name="Price"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Total product quantity</Form.Label>
                        <Form.Control
                            required
                            as="input"
                            type="number"
                            name="TotalQuantity"/>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Single stock</Form.Label>
                            <Form.Control
                                required
                                as="input"
                                type="number"
                                name="SingleStockQuantity"/>
                            <Form.Text muted>
                                Single product quantity
                            </Form.Text>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Unit</Form.Label>
                            <Form.Control
                                as="select"
                                name="QuantityUnit">
                                {this.weightUnits.map(unit => (
                                    <option value={unit}>{unit}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group> 
                        <Form.File accept="image/*" name="image" onChange={this.saveFile} />
                        <Form.Text muted>
                            Product image
                        </Form.Text>
                    </Form.Group>

                    <Button variant="success" type="submit" className="submitButton" size="lg">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default AddProduct;