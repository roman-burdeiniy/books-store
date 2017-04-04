/**
 * Created by roman_b on 4/3/2017.
 */
import Config from '../config/Config';
import _ from 'underscore';
import {loadData} from '../frontendSource/src/services/DataService';
import {getItemById} from '../frontendSource/src/utils/array-utils';
import {getTotalPrice, getTotalCount} from '../frontendSource/src/reducers/cart';


export const fetchCartItems = function(cartItemsMap, state) {
    if (_.isEmpty(cartItemsMap))
        return Promise.resolve(state);
    const cartItemsIds = cartItemsMap.map(item => item.id).join(',');
    let result = new Promise((success, reject) => {
        loadData(`${Config.apiEndpoint}/item/`, [cartItemsIds], true)
            .then(items => success(mergeCartItems(state, cartItemsMap, items)))
            .catch(err => reject(err));
    })
    return result;
}

function mergeCartItems(state, cartItemsMap, loadedItems){
    if (_.isEmpty(loadedItems))
        return state;
    let items = cartItemsMap.map(cartItem => {
        return {item: getItemById(loadedItems, cartItem.id), quantity: cartItem.quantity};
    });
    return {...state, cart : {items, totalPrice : getTotalPrice(items), totalCount : getTotalCount(items)}}
}