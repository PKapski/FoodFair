import React, {Component} from 'react';
import Container from "react-bootstrap/Container";

class Footer extends Component {
    render() {
        return (
            <footer className="footer mt-auto py-3 bg-success">
                <Container>
                    <span className="text-light">This side is made for Silesian University of Technology. All rights reserved.</span>
                </Container>
            </footer>
        );
    }
}

export default Footer;