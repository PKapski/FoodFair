import React, {Component} from 'react';
import { MdAddShoppingCart } from 'react-icons/md'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {Card, Button, Container, Row} from "react-bootstrap";

class Product extends Component {
    state = {
         isBootstrap: false
    }
    
    render() {
        const { product } = this.props;
        
        if (!this.state.isBootstrap) {
            return (
                <Card border="success" className="mb-4 shadow">
                    <Card.Img variant="top" src="https://picsum.photos/100/100" />
                    <Card.Body>
                        <Card.Title>
                            {product.name}
                        </Card.Title>
                        <Card.Text>
                            {product.description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Container>
                            <Row className="justify-content-between align-items-center">
                                <a className="text-muted">{product.price} {product.currency}</a>
                                <a href="#" className="stretched-link"/>
                                {/*<small className="text-muted">9 mins</small>*/}
                                <OverlayTrigger delay={{ show: 200, hide: 200 }} trigger="hover" placement="top" overlay={
                                    <Tooltip id="button-tooltip">
                                        Add to cart
                                    </Tooltip>} >
                                    <Button className="buyButton" variant="outline-success" ref="#"><MdAddShoppingCart size={25}/></Button>
                                </OverlayTrigger>
                            </Row>
                        </Container>
                    </Card.Footer>
                </Card>);
        } else {
            return (
                <div className="card mb-4 shadow border-success">
                    <svg className="bd-placeholder-img card-img-top" width="100%" height="225"
                         xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false"
                         role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#55595c"/>
                        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                    </svg>
                    <div className="card-body">
                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias animi
                            dicta esse facilis fugit inventore laborum laudantium, maiores necessitatibus provident
                            quibusdam repudiandae sed totam, ullam vero voluptates! Qui, tenetur!</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <a href="#" className="stretched-link"/>
                            {/*<small className="text-muted">9 mins</small>*/}
                            <OverlayTrigger delay={{ show: 5000, hide: 400 }} trigger="click" placement="right" overlay={
                                <Tooltip id="button-tooltip">
                                    Added to cart!
                                </Tooltip>} >
                                <button type="button" className="btn btn-outline-secondary buyButton"><MdAddShoppingCart size={25}/></button>
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Product;