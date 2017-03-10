/**
 * Created by roman_b on 1/23/2017.
 */
import { combineReducers } from 'redux';
import langStore from './language';
import dataModel from './dataModel';
import cartItems from './cart';

export default combineReducers({
    langStore,
    dataModel,
    cartItems
})