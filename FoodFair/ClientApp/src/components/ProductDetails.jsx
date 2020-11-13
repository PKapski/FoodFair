import React, {Component} from 'react';
import defaultImage from "../images/default-image.png";
import {Button, Col, Image, Row, Spinner} from "react-bootstrap";
import {ApiPaths, ImageSourcePrefix} from "./ProjectProperties";
import {Link} from "react-router-dom";
import {MdAddShoppingCart} from "react-icons/md";
import "./Products.css"
import AddedToCartModal from "./AddedToCartModal";
import {getQuantityString} from "./QuantityUtils"

export default class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.onAddToCartClick = this.onAddToCartClick.bind(this);
        this.handleModalExit = this.handleModalExit.bind(this);

        this.state = {
            loading: true,
            product: null,
            Image: defaultImage,
            smShow: false
        };
    }

    async componentDidMount() {
        const {match: {params}} = this.props;

        const response = await fetch(ApiPaths.Products + "/" + params.id);
        const data = await response.json();

        this.setState({product: data, loading: false});
        await this.fetchAndSetProductImage(data.imageId);
    }

    async fetchAndSetProductImage(imageId) {
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
    
    onAddToCartClick(id) {
        this.props.onAddCart(id);
        this.setState({smShow: true});
    }

    handleModalExit() {
        this.setState({smShow: false});
    }

    render() {
        console.log(this.props);

        const spinnerStyle = {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"};

        if (this.state.loading) {
            return (
                <div style={spinnerStyle}>
                    <Spinner animation="border" variant="success"/>
                </div>
            );
        } else if (!this.state.product) {
            return <h1> Invalid product!</h1>
        }

        const {id, name, description, supplierName, price, currency, singleStockQuantity, quantityUnit, totalQuantity, category} = this.state.product;

        return (
            <div className="detailsContainer">
                <Row>
                    <Col lg={4} xs={12} className="detailsInfoCol">
                        <div>
                            <Link to={`/suppliers/${supplierName}`}>Supplier: {supplierName}</Link>
                            <h1 className="productNameText">{name}</h1>
                            <span> {price} {currency}</span>
                            <p className="text-muted quantityText"> /{getQuantityString(singleStockQuantity, quantityUnit)}</p>
                            <Button variant="success" block onClick={() => this.onAddToCartClick(id)}><MdAddShoppingCart/> Add to
                                cart</Button>
                        </div>
                    </Col>
                    <Col lg={8} xs={8}>
                        <Row>
                            <Col lg={12} className="imageRow">
                                <Image src={this.state.Image} fluid/>

                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <p className="font-weight-bold">Description</p>
                            </Col>
                            <Col sm={8}>
                                <a>{description}</a>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <p className="font-weight-bold">Category</p>
                            </Col>
                            <Col sm={8}>
                                <a>{category}</a>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                                <p className="font-weight-bold">Total quantity</p>
                            </Col>
                            <Col sm={8}>
                                <a>{totalQuantity}</a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <AddedToCartModal name={name} show={this.state.smShow} onModalExit={this.handleModalExit}/>
                {/*<Modal*/}
                {/*    size="sm"*/}
                {/*    show={this.state.smShow}*/}
                {/*    onHide={() => this.setState({smShow: false})}*/}
                {/*    aria-labelledby="example-modal-sizes-title-sm"*/}
                {/*    centered>*/}
                {/*    <Modal.Header closeButton>*/}
                {/*        <Modal.Title id="example-modal-sizes-title-sm">*/}
                {/*            Added to cart!*/}
                {/*            <IconContext.Provider value={{className: "success-icon"}}>*/}
                {/*                <MdCheckCircle/>*/}
                {/*            </IconContext.Provider>*/}
                {/*        </Modal.Title>*/}
                {/*    </Modal.Header>*/}
                {/*    <Modal.Body>{name} has been added to cart!</Modal.Body>*/}
                {/*</Modal>*/}
            </div>
        );
    }
}

