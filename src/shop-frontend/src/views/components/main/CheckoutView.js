/**
 * Created by roman_b on 3/29/2017.
 */
import React from 'react';
import {getLocalizedLabel} from '../../../utils/localization-util';
import ShoppingCartPanel from '../checkout/ShoppingCartPanel';
import CheckoutDetails from '../checkout/CheckoutDetails';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/main/page-view.less');
    require('../../../../resources/styles/components/main/checkout-view.less');
}

export default class CheckoutView extends React.Component{
    render(){
        return <section className="page-view checkout-view">
            <section className="page-view_header">
                <h1>{getLocalizedLabel('checkout.header', 'Checkout')}</h1>
            </section>
            <ShoppingCartPanel cart={this.props.cart}
                               onQuantityChange={this.props.onQuantityChange}/>
            <CheckoutDetails cart={this.props.cart}
                             address={this.props.address}
                             submitOrder={this.props.submitOrder}/>
        </section>
    }
}