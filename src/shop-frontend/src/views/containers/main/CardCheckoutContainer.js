/**
 * Created by roman_b on 3/29/2017.
 */
import {connect} from 'react-redux';
import React from 'react';
import {PageContainerBase, baseMapStateToProps} from './PageContainerBase';
import CheckoutView from '../../components/main/CheckoutView';
import {placeOrder} from '../../../actions/orders';
import {quantityChange} from '../../../actions/cart';
import {getGroupById} from '../../../stores/finders/GroupFinder';

const mapStateToProps = function(state) {
    return {cart : state.cart,
            address : getAddress(state)};
}

const mapDispatchToProps = function(dispatch){
    return {
        placeOrder: function(orderInfo){
            dispatch(placeOrder(orderInfo));
        },
        onQuantityChange: function(quantityDescriptor){
            dispatch(quantityChange(quantityDescriptor));
        }
    }
}

function getAddress(state){
    const contactsInfo = getGroupById(state, 'contacts').data;
    return contactsInfo != null ? contactsInfo.address : '';
}

class CardCheckoutContainer extends React.Component {
    render(){
        return <CheckoutView
            onQuantityChange={this.props.onQuantityChange}
            submitOrder={this.props.placeOrder}
            address={this.props.address}
            cart={this.props.cart}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardCheckoutContainer);