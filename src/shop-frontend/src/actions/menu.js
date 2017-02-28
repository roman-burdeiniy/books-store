/**
 * Created by roman_b on 1/23/2017.
 */
import {SELECT_LANG, SELECT_MENU_ITEM, SELECT_SUB_MENU_ITEM, EXPAND_MENU_ITEM, COLLAPSE_MENU_ITEM} from '../constants/ActionTypes';
import {fetchCategories} from './categories';
import {fetchTranslations} from './languages';

export const fetchMenuItems = function(){
    return function(dispatch){
        dispatch(fetchCategories());
    }
}

export const selectSubMenuItem = function(itemId){
    return {
        type: SELECT_SUB_MENU_ITEM,
        itemId
    };
}

export const selectMenuItem = function(itemId){
    return {
        type: SELECT_MENU_ITEM,
        itemId
    };
}

export const expandMenuItem = function(itemId){
    return {
        type: EXPAND_MENU_ITEM,
        itemId
    };
}

export const collapseMenuItem = function(){
    return {
        type: COLLAPSE_MENU_ITEM
    };
}

export const selectLanguage = function(code){
    return function(dispatch){
        dispatch({type: SELECT_LANG, langCode: code})
        dispatch(fetchTranslations(code));
    }
}