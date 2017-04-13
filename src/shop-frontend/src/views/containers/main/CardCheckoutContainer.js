/**
 * Created by roman_b on 3/29/2017.
 */
import {connect} from 'react-redux';
import _ from 'underscore';
import React from 'react';
import CheckoutView from '../../components/main/CheckoutView';
import {placeOrder} from '../../../actions/orders';
import {getDefaultSelectedItem} from '../../../reducers/dataModel';
import {quantityChange, removeItem} from '../../../actions/cart';
import {getGroupById} from '../../../stores/finders/GroupFinder';

const mapStateToProps = function(state) {
    return {cart : state.cart,
            address : getAddress(state),
            defaultGroup : getDefaultSelectedItem(state.dataModel.groups)};
}

const mapDispatchToProps = function(dispatch){
    return {
        placeOrder: function(orderInfo){
            orderInfo.cart = this.props.cart;
            dispatch(placeOrder(orderInfo));
        },
        onQuantityChange: function(quantityDescriptor){
            dispatch(quantityChange(quantityDescriptor));
        },
        onRemoveItem : (itemId) => dispatch(removeItem(itemId))
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
            removeItem={this.props.onRemoveItem}
            defaultGroup={this.props.defaultGroup}
            submitOrder={this.props.placeOrder.bind(this)}
            address={this.props.address}
            cart={this.props.cart}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardCheckoutContainer);