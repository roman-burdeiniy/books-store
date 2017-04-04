/**
 * Created by roman_b on 3/10/2017.
 */
import RouteManager from '../managers/RouteManager';
import CookieManager from '../managers/CookieManager';
import {ADD_ITEM_TO_CART, QUANTITY_CHANGE} from '../constants/ActionTypes';
import {CHECKOUT_ROUTE} from '../constants/RoutesToActionsMap';

export const addItemToCart = function(item, quantity){
    return (dispatch) => {
        dispatch({type: ADD_ITEM_TO_CART, item, quantity});
        CookieManager.saveOrderCart();
    }
}

export const checkout = function(){
    return (dispatch) => {
        RouteManager.push(CHECKOUT_ROUTE);
        return Promise.resolve({});
    }
}

export const quantityChange = function(quantityDescriptor){
    return {
        type: QUANTITY_CHANGE,
        item: {_id : quantityDescriptor.id},
        quantity: quantityDescriptor.quantity
    }
}

