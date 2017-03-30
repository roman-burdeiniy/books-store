/**
 * Created by roman_b on 3/29/2017.
 */
import React from 'react';
import {getLocalizedLabel} from '../../../utils/localization-util';

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
        </section>
    }
}