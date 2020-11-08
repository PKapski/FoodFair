import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import {NavMenu} from './NavMenu';
import Footer from "./Footer";

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div className="d-flex flex-column min-vh-100">
                <NavMenu/>
                <main role="main" className="flex-shrink-0">
                    <Container>
                        {this.props.children}
                    </Container>
                </main>
                <Footer/>
            </div>
        );
    }
}
