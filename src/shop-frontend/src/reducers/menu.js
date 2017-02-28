/**
 * Created by roman_b on 1/23/2017.
 */
import {LOAD_CATEGORIES_SUCCESS, SELECT_MENU_ITEM,
    SELECT_SUB_MENU_ITEM, EXPAND_MENU_ITEM, COLLAPSE_MENU_ITEM} from '../constants/ActionTypes'
import update from 'immutability-helper';
import _ from 'underscore';
import MenuItem from '../stores/MenuItem';

const CONTACTS_ITEM = new MenuItem("contacts", "Contacts", "menu.button.contacts", null, '/img/menu/contacts-41x41.png', 999);
const POPULAR_ITEM = new MenuItem("popular", "Popular", "menu.button.popular", null, '/img/menu/fav-lit-40x41.png', -999, true);

let initialState = {staticMenuItems : [POPULAR_ITEM, CONTACTS_ITEM],
                    menuItems : [], selectedCatId: null, selectedSubCatId: null, expandedCatId : null};

function buildDynamicItems(categories){
    return categories.map(category=>{
       return new MenuItem(category._id, category.name, null, category.subCategories,
           category.img, category.disporder, category.isDefault);
    })
}


export default function menuItems(state = initialState, action){
    switch (action.type) {
        case LOAD_CATEGORIES_SUCCESS:
            let menuItems =  sortItems(buildDynamicItems(action.payload).concat(state.staticMenuItems));
            let selectedCat = getDefaultSelectedItem(menuItems, state);
            let selectedSubCat = getDefaultSelectedSubItem(selectedCat, state);
            let subCatId = selectedSubCat != null ? selectedSubCat._id : null;
            return {...state, menuItems, selectedCatId : selectedCat._id, selectedSubCatId : subCatId};
        case EXPAND_MENU_ITEM:{
            return {...state, expandedCatId: action.itemId};
        }
        case COLLAPSE_MENU_ITEM:{
            return {...state, expandedCatId: null};
        }
        case SELECT_MENU_ITEM:{
            return {...state, selectedCatId: action.itemId, selectedSubCatId: null, expandedCatId : null};
        }
        case SELECT_SUB_MENU_ITEM:{
            let selectedCatId = state.expandedCatId != null ? state.expandedCatId : state.selectedCatId;
            return {...state, selectedSubCatId: action.itemId, selectedCatId, expandedCatId : null};
        }
        default:
            return state
    }
}

function getDefaultSelectedItem(menuItems, currentState){
    let selectedItem = currentState.selectedCatId != null ?
        menuItems.find(item => item._id == currentState.selectedCatId) :
        menuItems.find(item => item.isDefault == true);
    return selectedItem != null ? selectedItem : menuItems[0];
}

function getDefaultSelectedSubItem(item, currentState){
    let result;
    if (item != null && item.children != null){
        result = item.children.find(item => item._id == currentState.selectedSubCatId);
    }
    return result;
}

function sortItems(items){
    items.sort((item1, item2)=>{
        if (item1.disporder < item2.disporder){
            return -1;
        }else if(item1.disporder > item2.disporder){
            return 1;
        }
        return 0;
    });
    return items;
}