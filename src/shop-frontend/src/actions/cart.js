/**
 * Created by roman_b on 3/10/2017.
 */
import RouteManager from '../managers/RouteManager';
import {ADD_ITEM_TO_CART, CHECKOUT} from '../constants/ActionTypes';
import {CHECKOUT_ROUTE} from '../constants/RoutesToActionsMap';

export const addItemToCart = function(item, quantity){
    return {
        type: ADD_ITEM_TO_CART,
        item,
        quantity
    };
}

export const checkout = function(){
    return (dispatch) => {
        RouteManager.push(CHECKOUT_ROUTE);
        return Promise.resolve({});
    }
}

