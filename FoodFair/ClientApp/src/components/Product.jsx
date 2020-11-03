import React, {Component} from 'react';
import { MdAddShoppingCart } from 'react-icons/md'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class Product extends Component {

    
    render() {
        
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

export default Product;