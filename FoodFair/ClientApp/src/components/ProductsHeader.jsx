import React, {Component} from 'react';

class ProductsHeader extends Component {
    render() {
        return (
            <section className="jumbotron text-center">
                <div className="container">
                    <h1>Our Products</h1>
                    <p className="lead text-muted">Browse products from our finest suppliers.<br/>
                        Click on certain product for more information.</p>
                    <form>
                        <input className="form-control" type="text" placeholder="Search by name:"/>
                    </form>
                </div>
            </section>
        );
    }
}

export default ProductsHeader;
