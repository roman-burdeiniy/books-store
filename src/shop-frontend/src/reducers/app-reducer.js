/**
 * Created by roman_b on 1/23/2017.
 */
import { combineReducers } from 'redux';
import config from './config';
import langModel from './langModel';
import dataModel from './dataModel';
import cartItems from './cart';

export default combineReducers({
    config,
    langModel,
    dataModel,
    cartItems
})