import React, {Component} from 'react';
import "./Footer.css"

class Footer extends Component {
    render() {
        return (
            <footer className="footer mt-auto py-3 bg-success">
                <div className="container">
                    <span className="text-light">This side is made for Silesian University of Technology. All rights reserved.</span>
                </div>
            </footer>
        );
    }
}

export default Footer;