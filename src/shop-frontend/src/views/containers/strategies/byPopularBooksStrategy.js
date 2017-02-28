/**
 * Created by roman_b on 2/28/2017.
 */
import {getLocalizedLabel} from '../../../utils/localization-util';
import {getItemById} from '../../../utils/array-utils';

export const populateHeaderName = (store)=>{
    return buildLabel(getMenuItem(store.menu.menuItems, store.menu.selectedCatId));
}

export const populateBooksCollection = (store)=>{
    return store.popularItems;
}

function getMenuItem(menuItems, selectedCatId){
    return getItemById(menuItems, selectedCatId) || {};
}

function buildLabel(menuItem){
    return getLocalizedLabel(menuItem.localKey, menuItem.name);
}