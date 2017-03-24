/**
 * Created by roman_b on 3/10/2017.
 */
import React from 'react';
import {getLocalizedLabel} from '../../../utils/localization-util';
import _ from 'underscore';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/shopping-cart.less');
}

export default class ShoppingCart extends React.Component{

    render(){
        return <button className="shopping-cart-button">
            <section className="shopping-cart-button_bg-image">
                <span className="items-count">{this.getTotalItemsCount(this.props.items)}</span>
            </section>
        </button>
    }

    getTotalItemsCount(items){
        let res = items.reduce((prev, current) => {
            prev.quantity = prev.quantity + current.quantity;
            return prev;
        }, {quantity : 0});
        return res.quantity;
    }
}