/**
 * Created by roman_b on 3/30/2017.
 */
import React from 'react';
import {getLocalizedLabel} from '../../../utils/localization-util';
import {RadioGroup, Radio} from 'react-radio-group'
import {SELF_PICKUP, NEW_POST, ADDRESS_DELIVERY} from '../../../constants/DeliveryTypes';
import CustomerInfoForm from '../../containers/checkout/CustomerInfoForm';
import {getDataDependentClassName} from '../../../utils/string-utils';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/checkout/checkout-details.less');
}

export default class CheckoutDetails extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <section className={getDataDependentClassName('checkout-details', this.props.cart.items)()}>
            <CustomerInfoForm address={this.props.address}
                onSubmit={this.props.submitOrder}/>
        </section>
    }

}
