/**
 * Created by roman_b on 4/13/2017.
 */
import {connect} from 'react-redux';
import React from 'react';
import {OrderConfirmedView} from '../../components/order/OrderConfirmedView'
import {getLastOrder} from '../../../reducers/ordersModel';
import {getDefaultSelectedItem} from '../../../reducers/dataModel';

const mapStateToProps = function(state) {
    return {order: getLastOrder(state.ordersModel.orders),
        defaultGroup : getDefaultSelectedItem(state.dataModel.groups)}
}

export default connect(mapStateToProps)(OrderConfirmedView)