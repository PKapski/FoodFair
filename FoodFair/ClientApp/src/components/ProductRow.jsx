import React, {Component} from 'react';
import {Button, Image} from "react-bootstrap";
import defaultImage from "../images/default-image.png";
import './Products.css'
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import {Link} from "react-router-dom";
import {ApiPaths, ImageSourcePrefix} from "./ProjectProperties";

class ProductRow extends Component {
    constructor(props) {
        super(props);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleProductDelete = this.handleProductDelete.bind(this);
        this.handleModalExit = this.handleModalExit.bind(this);

        this.state = {
            Image: defaultImage,
            showDeleteConfirmation: false
        }
    }
    
    async componentDidMount() {
        const {imageId} = this.props.product;
        if (imageId === null) {
            return;
        }
        let base64Image = await this.fetchBase64ImageData(imageId);
        base64Image = ImageSourcePrefix + this.getResponseWithoutQuotes(base64Image);
        this.setState({Image: base64Image});
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

    handleModalOpen() {
        this.setState({showDeleteConfirmation: true});
    }

    handleProductDelete(id) {
        this.handleModalExit();
        this.props.onDelete(id);
    }
    
    handleModalExit() {
        this.setState({showDeleteConfirmation: false});
    }
    
    render() {
        const {id, name, category, price, currency, singleStockQuantity, quantityUnit, totalQuantity} = this.props.product;

        return (
            <React.Fragment>
                <tr key={id}>
                    <td className="imageTableColumn"><Image src={this.state.Image} fluid/></td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{price} {currency} /{this.getQuantityString(singleStockQuantity, quantityUnit)}</td>
                    <td>{totalQuantity}</td>
                    <td>
                        <Link to={`/me/products/edit/${id}`}>
                            <Button variant="primary">Edit</Button>
                        </Link>
                    </td>
                    <td><Button variant="danger" onClick={this.handleModalOpen}>Detete</Button></td>
                </tr>
                <DeleteConfirmationModal name={name} show={this.state.showDeleteConfirmation} onModalExit={this.handleModalExit} onDelete={() => this.handleProductDelete(id)}/>
            </React.Fragment>
        );
    }

    getQuantityString(singleStockQuantity, quantityUnit) {
        if (singleStockQuantity === 1) {
            return quantityUnit;
        }

        let quantityString = singleStockQuantity + " ";
        quantityString += this.getQuantityUnit(quantityUnit);
        return quantityString;
    }

    getQuantityUnit(quantityUnit) {
        return quantityUnit === "Piece" ? "Pieces" : quantityUnit;
    }
}

export default ProductRow;