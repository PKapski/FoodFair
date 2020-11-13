import React, {Component} from 'react';
import Container from "react-bootstrap/Container";

class ProductsHeader extends Component {
    render() {
        return (
            <section className="jumbotron text-center">
                <Container>
                    <h1>Our Products</h1>
                    <p className="lead text-muted">Browse products from our finest suppliers.<br/>
                        Click on certain product for more information.</p>
                    <form>
                        <input className="form-control" type="text" placeholder="Search by name:" onChange={this.props.onNameFilterChange} />
                    </form>
                </Container>
            </section>
        );
    }
}

export default ProductsHeader;
