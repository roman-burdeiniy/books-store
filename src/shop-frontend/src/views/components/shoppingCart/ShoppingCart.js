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
                <ShoppingCartPopup myValue="test" cart={this.props.cart}
                                   removeItem={this.props.removeItem}
                                   onMouseOver={this.showShoppingCart.bind(this)}
                                   onCheckout={this.onCheckout.bind(this)}
                                   isActive={this.state.name == 'hover'}/>
            </section>
    }

    showShoppingCart(ev){
        if (this.cartPopupVisible)
            return;
        this.cartPopupVisible = true;
        clearTimeout(this.hidePopupTimerId);
        this.showPopupTimerId = setTimeout(() => {
                this.setState({name: "hover"})
        }, 300);
    }

    hideShoppingCart(delay = 300){
        if (!this.cartPopupVisible)
            return;
        this.cartPopupVisible = false;
        clearTimeout(this.showPopupTimerId);
        this.hidePopupTimerId = setTimeout(() => {
                this.setState({name: "default"})
            }, delay);
    }

    onCheckout(ev){
        this.hideShoppingCart(0);
        this.props.onCheckout();
    }

    handleClickOutside() {
        this.setState({name: "default"});
    }
}