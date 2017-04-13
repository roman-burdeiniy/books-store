/**
 * Created by roman_b on 4/10/2017.
 */
import {PLACE_ORDER_SUCCESS, PLACE_ORDER_IN_PROGRESS,
    PLACE_ORDER_ERROR} from '../constants/ActionTypes'
import update from 'immutability-helper';
import _ from 'underscore'
import {PLACED, ERROR, PLACING} from '../constants/OrderStatus';

let initialState = {orders: [], currentOrder : null};

export default function ordersModel(state = initialState, action){
    switch (action.type) {
        case PLACE_ORDER_SUCCESS:{
            action.order.status = PLACED;
            return {...state, orders: update(state.orders, {$push: [action.order]}), currentOrder : null};
        }
        case PLACE_ORDER_ERROR:{
            action.order.status = ERROR;
            return {...state, currentOrder : action.order};
        }
        case PLACE_ORDER_IN_PROGRESS:{
            action.order.status = PLACING;
            return {...state, currentOrder : action.order};
        }
        default:
            return state
    }
}

export const getLastOrder = (orders) => {
    return !_.isEmpty(orders) ? orders[0] : null;
}