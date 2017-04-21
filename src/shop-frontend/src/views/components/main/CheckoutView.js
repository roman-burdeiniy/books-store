/**
 * Created by roman_b on 3/29/2017.
 */
import React from 'react';
import _ from 'underscore';
import ItemsGroup from '../../../stores/ItemsGroup';
import PropTypes from 'prop-types';
import {getLocalizedLabel} from '../../../utils/localization-util';
import ShoppingCartPanel from '../checkout/ShoppingCartPanel';
import CheckoutDetails from '../checkout/CheckoutDetails';
import {getDataDependentClassName} from '../../../utils/string-utils';
import {ContinueShoppingLink} from '../../controls/ContinueShoppingLink';
import {Link} from 'react-router-dom'

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
            <section className={getDataDependentClassName('empty-cart-message', _.isEmpty(this.props.cart.items))()}>
                {getLocalizedLabel('shopping.cart.empty', 'Your cart is empty')}
                <ContinueShoppingLink defaultGroup={this.props.defaultGroup}/>
            </section>
            <ShoppingCartPanel cart={this.props.cart}
                               removeItem={this.props.removeItem}
                               onQuantityChange={this.props.onQuantityChange}/>
            <CheckoutDetails cart={this.props.cart}
                             address={this.props.address}
                             submitOrder={this.props.submitOrder}/>
        </section>
    }
}

CheckoutView.contextTypes = {intl: PropTypes.object};