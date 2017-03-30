/**
 * Created by roman_b on 3/10/2017.
 */
import React from 'react';
import _ from 'underscore';
import {ShoppingCartPopup} from './ShoppingCartPopup';
import enhanceWithClickOutside from 'react-click-outside';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/shopping-cart.less');
}

export default class ShoppingCart extends React.Component{

    constructor(props){
        super(props);
        this.state = {name: "default"};
    }

    render(){
        return <section className="shopping-cart-holder"
                        onMouseOver={this.showShoppingCart.bind(this)}
                        onMouseOut={this.hideShoppingCart.bind(this)}>
                <button className="shopping-cart-button"
                        onClick={this.showShoppingCart.bind(this)}>
                    <section className="shopping-cart-button_bg-image">
                        <span className="items-count">{this.props.cart.totalCount}</span>
                    </section>
                </button>
                <ShoppingCartPopup cart={this.props.cart}
                                   onCheckout={this.onCheckout.bind(this)}
                                   isActive={this.state.name == 'hover'}/>
            </section>
    }

    showShoppingCart(ev){
        this.setState({name: "hover"});
    }

    hideShoppingCart(){
        this.setState({name: "default"});
    }

    onCheckout(ev){
        this.hideShoppingCart();
        this.props.onCheckout();
    }

    handleClickOutside() {
        this.setState({name: "default"});
    }
}