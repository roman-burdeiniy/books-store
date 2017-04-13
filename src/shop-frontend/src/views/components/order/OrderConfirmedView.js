/**
 * Created by roman_b on 4/13/2017.
 */
import React from 'react';
import {getLocalizedLabel, getLocalizedHTMLLabel} from '../../../utils/localization-util';
import {ContinueShoppingLink} from '../../controls/ContinueShoppingLink';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/main/page-view.less');
    require('../../../../resources/styles/components/order/order-view.less');
}

export const OrderConfirmedView = (props) => {
    return props.order == null ? null :
        <section className="page-view order-view">
            <section className="page-view_header">
                <h1>{getLocalizedLabel('order.view.confirm.header', 'Thank you for your order!')}</h1>
            </section>
            <section className="order-confirm-details">
                <section className="order-confirm-number">
                    {getLocalizedLabel('order.view.confirm.number', "Order number:")}&nbsp;
                    <span className="order-number">{props.order.key}</span>
                </section>
                <section className="order-confirm-message">
                    {getLocalizedHTMLLabel('order.view.confirm.message', "Congratulations, your order accepted.<br/>We will call you soon for order details clarification.")}
                </section>
                <ContinueShoppingLink defaultGroup={props.defaultGroup}/>
            </section>
        </section>
}