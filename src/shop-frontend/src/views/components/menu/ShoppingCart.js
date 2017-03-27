/**
 * Created by roman_b on 3/10/2017.
 */
import React from 'react';
import {getLocalizedLabel} from '../../../utils/localization-util';
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
                        onClick={this.showShoppingCart.bind(this)}
                        onMouseOver={this.showShoppingCart.bind(this)}
                        onMouseOut={this.hideShoppingCart.bind(this)}>
                <button className="shopping-cart-button">
                    <section className="shopping-cart-button_bg-image">
                        <span className="items-count">{this.getTotalItemsCount(this.props.items)}</span>
                    </section>
                </button>
                <ShoppingCartPopup items={this.props.items}
                                   isActive={this.state.name == 'hover'}/>
            </section>
    }

    getTotalItemsCount(items){
        let res = items.reduce((prev, current) => {
            prev.quantity = prev.quantity + current.quantity;
            return prev;
        }, {quantity : 0});
        return res.quantity;
    }

    showShoppingCart(ev){
        this.setState({name: "hover"});
    }

    hideShoppingCart(){
        this.setState({name: "default"});
    }

    handleClickOutside() {
        this.setState({name: "default"});
    }
}