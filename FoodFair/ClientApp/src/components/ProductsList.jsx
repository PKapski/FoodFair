import React, {Component} from 'react';
import Product from "./Product";

class ProductsList extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <Product/>
                    {/*<Product/>*/}
                </div>
                <div className="col-md-4">
                    <Product/>
                </div>
                <div className="col-md-4">
                    <Product/>
                </div>
                <div className="col-md-4">
                    <Product/>
                </div>
            </div>
        );
    }
}

export default ProductsList;