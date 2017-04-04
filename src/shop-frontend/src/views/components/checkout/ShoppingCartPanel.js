/**
 * Created by roman_b on 3/30/2017.
 */
import React from 'react';
import CartItem from './CartItem'
import {getLocalizedLabel} from '../../../utils/localization-util';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/checkout/shopping-cart-panel.less');
}

export default class ShoppingCartPanel extends React.Component{
    render(){
        return <section className="shopping-cart-panel">
            <ul>
                {this.props.cart.items.map((item) =>{
                    return <CartItem
                        onQuantityChange={this.props.onQuantityChange}
                        data={item}
                        key={item.item._id}/>
                })
                }
            </ul>
            <section className="sub-total">
                {getLocalizedLabel('shopping.cart.subtotal', 'Subtotal')}&nbsp;
                <section className="subtotal-price price-label">{this.props.cart.totalPrice}{getLocalizedLabel('currency', 'UAH')}</section>
            </section>

        </section>
    }

}