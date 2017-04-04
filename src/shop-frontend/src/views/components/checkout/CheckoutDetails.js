/**
 * Created by roman_b on 3/30/2017.
 */
import React from 'react';
import {getLocalizedLabel} from '../../../utils/localization-util';
import {RadioGroup, Radio} from 'react-radio-group'
import {SELF_PICKUP, NEW_POST, ADDRESS_DELIVERY} from '../../../constants/DeliveryTypes';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/checkout/checkout-details.less');
}

export default class CheckoutDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {deliveryMethod : SELF_PICKUP};
    }

    render(){
        return <section className="checkout-details">
            <form className="customer-details-form" action="">
                <fieldset>
                    <section>
                        <label form="name">{getLocalizedLabel('customer.form.name', 'Name and surname')}</label>
                        <input type="text" ref="name" id="name" name="name" required/>
                    </section>
                    <section>
                        <label form="phone">{getLocalizedLabel('customer.form.phone_num', 'Phone')}</label>
                        <input type="tel" ref="phone" id="phone" name="phone" required/>
                    </section>
                    <section>
                        <label form="email">{getLocalizedLabel('customer.form.email', 'Email')}</label>
                        <input type="email" ref="email" id="email" name="email"/>
                    </section>
                    <section className="delivery-method-section">
                        <label className="delivery-method-label" form="delivery_method">{getLocalizedLabel('customer.form.delivery_method', 'Delivery method')}</label>
                        <RadioGroup selectedValue={this.state.deliveryMethod} onChange={this.onDeliveryChange.bind(this)}>
                            <Radio value={SELF_PICKUP}/>{getLocalizedLabel('customer.form.delivery.pickup', 'Pickup')}<span className="pickup-address">{'('+this.props.address+')'}</span><br/>
                            <Radio value={NEW_POST}/>{getLocalizedLabel('customer.form.delivery.new_post', 'New post')}<br/>
                            <Radio value={ADDRESS_DELIVERY}/>{getLocalizedLabel('customer.form.delivery.address_delivery', 'Address delivery in Kyiv')}<br/>
                        </RadioGroup>
                    </section>
                    {this.deliveryMap()[this.state.deliveryMethod]()}
                    <section>
                        <label form="comments">{getLocalizedLabel('shipping.form.comments', 'Comments')}</label>
                        <input type="text" ref="comments" id="comments" name="comments"/>
                    </section>
                    <section>
                        <input type="submit" value={this.context.intl.formatMessage({id:"customer.form.submit", defaultMessage: "Place order"})}/>
                    </section>
                </fieldset>
            </form>
        </section>
    }

    onDeliveryChange(deliveryMethod){
       this.setState({deliveryMethod});
    }

    sendFormData(){
        let genderSelect = this.refs.gender;
        var formData = {
            name: this.refs.name.value,
            phone: this.refs.phone.value,
            email: this.refs.email.value,
            cart : this.cart
        };
        this.props.submitOrder(formData);
    }

    newPostDetails(){
        return  <section>
                    <section>
                        <label form="city">{getLocalizedLabel('shipping.form.city', 'City')}</label>
                        <input type="text" ref="city" id="city" name="city"/>
                    </section>
                    <section>
                        <label form="officeNumber">{getLocalizedLabel('shipping.form.post_office_num', 'Office number')}</label>
                        <input type="select" ref="officeNumber" id="officeNumber" name="officeNumber"/>
                    </section>
                </section>
    }

    addressDetails(){
        return   <section>
                    <label form="phone">{getLocalizedLabel('shipping.form.address', 'Address')}</label>
                    <input type="text" ref="address" id="address" name="address"/>
                </section>
    }

    deliveryMap(){
        return {
            [SELF_PICKUP] : ()=> null,
            [NEW_POST]: this.newPostDetails,
            [ADDRESS_DELIVERY]: this.addressDetails
        }
    }

}

CheckoutDetails.contextTypes = {intl: React.PropTypes.object};
