import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import './custom.css'
import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
import Cart from "./components/Cart"
import Login from "./components/api-authorization/Login";
import SecuredRoute from "./components/api-authorization/SecuredRoute";
import MyProducts from "./components/MyProducts";
import Register from "./components/api-authorization/Register";
import {addToCart, getCartCount} from "./components/CartUtils"

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.incrementCartItems = this.incrementCartItems.bind(this)
        this.storeInLocalStorageAndReturnCount = this.storeInLocalStorageAndReturnCount.bind(this);
        this.handleCartCountChange = this.handleCartCountChange.bind(this);

        this.state = {
            itemsInCart: getCartCount()
        }
    }

    incrementCartItems(productId) {
        const count = this.storeInLocalStorageAndReturnCount(productId);
        this.setState({
            itemsInCart: count
        })
    }

    storeInLocalStorageAndReturnCount(productId) {
        addToCart(productId);
        return getCartCount();
    }

    handleCartCountChange(newCount) {
        this.setState({itemsInCart: newCount});
    }

    render() {
        return (
            <Layout cartCount={this.state.itemsInCart}>
                <Route exact path='/' component={Home}/>
                <Route exact path='/products'
                       render={(props) => <Products onAddCart={this.incrementCartItems} {...props}/>}/>
                <Route path="/products/:id"
                       render={(props) => <ProductDetails onAddCart={this.incrementCartItems}
                                                          method='POST' {...props}/>}/>
                <SecuredRoute exact path='/me/products/add' component={AddProduct}/>
                {/*<Route path='/cart' component={Cart} onCartClear={this.handleCartClear}/>*/}
                <Route path='/cart'
                       render={(props) => <Cart onCartCountChange={this.handleCartCountChange} {...props}/>}/>
                <Route path='/login' component={Login}/>
                <SecuredRoute exact path='/me/products' component={MyProducts}/>
                {/*<SecuredRoute path="/me/products/:id"*/}
                {/*              render={(props) => <AddProduct method='PUT' {...props}/>}/>*/}
                <SecuredRoute path="/me/products/edit/:id" component={AddProduct}/>
                <Route path="/register" component={Register}/>
                <SecuredRoute path="/me/account/edit" component={Register}/>
            </Layout>
        );
    }
}
