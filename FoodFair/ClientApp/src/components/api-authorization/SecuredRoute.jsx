import React, {Component} from 'react';
import {isLoggedIn} from "./AuthProvider"
import {Route} from "react-router";
import Login from "./Login";
import {Redirect} from "react-router-dom";


class SecuredRoute extends Component {
    render() {
        const {component: Component, ...rest} = this.props;

        return (<Route {...rest}
                       render={(props) => {
                           if (isLoggedIn()) {
                               return <Component {...props} />
                           } else {
                               return <Redirect to="/login"/>
                           }
                       }}/>)
    }
}

export default SecuredRoute;