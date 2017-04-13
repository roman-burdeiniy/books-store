/**
 * Created by roman_b on 4/3/2017.
 */
import {ADD_ITEM_TO_CART, CHECKOUT, PLACE_ORDER_SUCCESS, PLACE_ORDER_IN_PROGRESS,
    PLACE_ORDER_ERROR} from '../constants/ActionTypes';
import {sendData} from '../services/DataService';
import getConfig from '../config/Config';
import RouteManager from '../managers/RouteManager';
import {emptyCart} from './cart';
import {generateOrderRoute, generateErrorRoute} from '../constants/RoutesToActionsMap';

export const placeOrder = function(order){
    return (dispatch) => {
        dispatch(placeOrderInProgress(order));
        return sendData(`${getConfig().apiEndpoint}/orders`, order)
        .then(result => {
            RouteManager.push(generateOrderRoute(result.key))
            dispatch(placeOrderSuccess(result))
            dispatch(emptyCart())
        })
        .catch(error => {
            throw error;
            RouteManager.push(generateErrorRoute())
            dispatch(placeOrderError(order))})
    }
}

function placeOrderInProgress(order){
    return {
        type: PLACE_ORDER_IN_PROGRESS,
        order
    }
}

function placeOrderSuccess(order){
    return {
        type: PLACE_ORDER_SUCCESS,
        order
    }
}

function placeOrderError(order){
    return {
        type: PLACE_ORDER_ERROR,
        order
    }
}