/**
 * Created by roman_b on 3/10/2017.
 */
import React from 'react';
import _ from 'underscore';
import {ShoppingCartPopup} from './ShoppingCartPopup';
import enhanceWithClickOutside from 'react-click-outside';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/shoppingCart/shopping-cart.less');
}

export default class ShoppingCart extends React.Component{

    constructor(props){
        super(props);
        this.state = {name: "default"};
    }

    render(){
        return <section className="shopping-cart-holder"
                        onMouseLeave={this.hideShoppingCart.bind(this)}>
                <button className="shopping-cart-button"
                        onMouseOver={this.showShoppingCart.bind(this)}
                        onClick={this.showShoppingCart.bind(this)}>
                    <section className="shopping-cart-button_bg-image">
                        <span className="items-count">{this.props.cart.totalCount}</span>
                    </section>
                </button>
                <ShoppingCartPopup cart={this.props.cart}
                                   onMouseOver={this.showShoppingCart.bind(this)}
                                   onCheckout={this.onCheckout.bind(this)}
                                   isActive={this.state.name == 'hover'}/>
            </section>
    }

    showShoppingCart(ev){
        this.showAgain = true;
        setTimeout(() => {
                this.setState({name: "hover"})
        }, 300);
    }

    hideShoppingCart(){
        this.showAgain = false;
        setTimeout(() => {
            if (!this.showAgain)
                this.setState({name: "default"})
            }, 300);
    }

    onCheckout(ev){
        this.hideShoppingCart();
        this.props.onCheckout();
    }

    handleClickOutside() {
        this.setState({name: "default"});
    }
}