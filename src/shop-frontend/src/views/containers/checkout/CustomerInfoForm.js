/**
 * Created by roman_b on 4/6/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {getLocalizedLabel} from '../../../utils/localization-util';
import {RadioGroup, Radio} from 'react-radio-group'
import {SELF_PICKUP, NEW_POST, ADDRESS_DELIVERY} from '../../../constants/DeliveryTypes';
import FormValidator from '../../controls/validators/FormValidator';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/checkout/customer-info-form.less');
}


class CustomerInfoForm extends React.Component{

    constructor(props, context){
        super(props);
        this.validator = new FormValidator(context.intl);
        this.state = {deliveryMethod : SELF_PICKUP};
    }

    renderField({ input, label, type, meta: { touched, error, warning }, required}) {
       return <section>
           <label>{label}</label>
           <section className="form-input">
               <section><input {...input} type={type} required={required}/></section>
               {touched && ((error && <section className="validation-error-label">{error}</section>) || (warning && <section>{warning}</section>))}
           </section>
       </section>
    }


    render(){
        return <form className="customer-details-form"
                     onSubmit={this.props.handleSubmit(this.onPlaceOrder.bind(this))}>
                <fieldset>
                    <Field name="name" label={getLocalizedLabel('customer.form.name', 'Name and surname')}
                           component={this.renderField} required type="text" validate={[this.validator.required()]}/>
                    <Field name="phone" label={getLocalizedLabel('customer.form.phone_num', 'Phone')}
                           component={this.renderField} required type="text"
                           validate={[this.validator.required(), this.validator.phone()]}
                           normalize={this.validator.normalizePhone()}/>
                    <Field name="email" label={getLocalizedLabel('customer.form.email', 'Email')}
                           component={this.renderField} type="email" validate={[this.validator.email()]}/>
                    <section className="delivery-method-section">
                        <label className="delivery-method-label" form="delivery_method">{getLocalizedLabel('customer.form.delivery_method', 'Delivery method')}</label>
                        <RadioGroup selectedValue={this.state.deliveryMethod} onChange={this.onDeliveryChange.bind(this)}>
                            <Radio value={SELF_PICKUP}/>{getLocalizedLabel('customer.form.delivery.pickup', 'Pickup')}<span className="pickup-address">{'('+this.props.address+')'}</span><br/>
                            <Radio value={NEW_POST}/>{getLocalizedLabel('customer.form.delivery.new_post', 'New post')}<br/>
                            <Radio value={ADDRESS_DELIVERY}/>{getLocalizedLabel('customer.form.delivery.address_delivery', 'Address delivery in Kyiv')}<br/>
                        </RadioGroup>
                    </section>
                    {this.deliveryMap()[this.state.deliveryMethod]()}
                    <section className="form-input">
                        <label form="comments">{getLocalizedLabel('shipping.form.comments', 'Comments')}</label>
                        <Field name="comments" id="comments" component="textarea" type="text"/>
                    </section>
                    <section>
                        <input type="submit" value={this.context.intl.formatMessage({id:"customer.form.submit", defaultMessage: "Place order"})}/>
                    </section>
                </fieldset>
            </form>
    }

    onPlaceOrder(order){
        order.deliveryMethod = this.state.deliveryMethod;
        this.props.onSubmit(order);
    }

    onDeliveryChange(deliveryMethod){
        this.setState({deliveryMethod});
    }

    newPostDetails(){
        return  <section>
            <section>
                <label form="city">{getLocalizedLabel('shipping.form.city', 'City')}</label>
                <Field name="city" component="input" type="text"/>
            </section>
            <section>
                <label form="officeNumber">{getLocalizedLabel('shipping.form.post_office_num', 'Office number')}</label>
                <Field name="officeNumber" component="input" type="select"/>
            </section>
        </section>
    }

    addressDetails(){
        return   <section>
            <label form="phone">{getLocalizedLabel('shipping.form.address', 'Address')}</label>
            <Field name="address" component="input" type="text"/>
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


CustomerInfoForm.contextTypes = {intl: PropTypes.object};

export default reduxForm({form: 'customerInfo'})(CustomerInfoForm);