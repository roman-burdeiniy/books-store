/**
 * Created by roman_b on 3/1/2017.
 */
import {LOAD_CATEGORIES_SUCCESS, SELECT_MENU_ITEM,
    SELECT_SUB_MENU_ITEM, EXPAND_MENU_ITEM, COLLAPSE_MENU_ITEM,
    LOAD_ITEMS_SUCCESS, LOADING_ITEMS, LOAD_ITEMS_ERROR, LOAD_SELECTED_ITEM_SUCCESS, LOAD_SELECTED_ITEM_ERROR} from '../constants/ActionTypes'
import _ from 'underscore';
import ItemsGroup from '../stores/ItemsGroup';
import popularItems from './popularItems';
import update from 'immutability-helper';
import {getItemById, getItemIndex} from '../utils/array-utils';

const contactsGroup = new ItemsGroup("contacts", "Contacts", "menu.button.contacts", null, '/img/menu/contacts-41x41.png', 999);
const popularGroup = new ItemsGroup("popular", "Popular", "menu.button.popular", null, '/img/menu/fav-lit-40x41.png', -999, true);

const staticGroups = [popularGroup, contactsGroup];

let initialState = {groups : [], selectedGroupId: null, selectedSubGroupId: null,
    expandedGroupId : null, isInitialized : false};

export default function dataModel(state = initialState, action){
    switch (action.type) {
        case LOAD_CATEGORIES_SUCCESS:
            popularGroup.items = popularItems(null, action);
            let groups =  sortItems(buildDynamicItems(action.payload).concat(staticGroups));
            let selectedGroup = getDefaultSelectedItem(groups, state);
            let selectedSubGroup = getDefaultSelectedSubItem(selectedGroup, state);
            return {...state, groups, selectedGroupId : selectedGroup._id,
                selectedSubGroupId : selectedSubGroup._id, isInitialized : true};
        case EXPAND_MENU_ITEM:{
            return {...state, expandedGroupId: action.itemId};
        }
        case COLLAPSE_MENU_ITEM:{
            return {...state, expandedGroupId: null};
        }
        case SELECT_MENU_ITEM:{
            return {...state, selectedGroupId: action.itemId, selectedSubGroupId: null, expandedGroupId : null, selectedItem : null};
        }
        case SELECT_SUB_MENU_ITEM:{
            let selectedGroupId = state.expandedGroupId != null ? state.expandedGroupId : state.selectedGroupId;
            return {...state, selectedSubGroupId: action.itemId, selectedGroupId, expandedGroupId : null, selectedItem : null};
        }
        case LOADING_ITEMS:{
            let groups = getUpdatedGroups(state.groups, action.groupIdsChain, {isLoading: {$set: true}});
            return {...state, groups};
        }
        case LOAD_ITEMS_SUCCESS:{
            let groups = getUpdatedGroups(state.groups, action.groupIdsChain, {isLoading: {$set: false}, items: {$set: action.items}});
            return {...state, groups};
        }
        case LOAD_ITEMS_ERROR:{
            let groups = getUpdatedGroups(state.groups, action.groupIdsChain, {isLoading: {$set: false}, items: {$set: []}});
            return {...state, groups};
        }
        case LOAD_SELECTED_ITEM_SUCCESS:{
            return {...state, selectedItem : action.item};
        }
        case LOAD_SELECTED_ITEM_ERROR:{
            return {...state, selectedItem : null};
        }
        default:
            return state
    }
}

function getUpdatedGroups(groups, groupIdsChain, updateObj){
    groupIdsChain = groupIdsChain.filter(id => id != null);
    let updateMap = {
        0 : updateGroup,
        1 : updateSubGroup
    }
    let updatedGroups = updateMap[groupIdsChain.length - 1](groups, groupIdsChain, updateObj);
    return updatedGroups;
}

function updateGroupStrategy(groups, groupIdsChain){
    return function(getUpdate){
        let index = getItemIndex(groups, groupIdsChain[0]);
        var updatedGroups = update(groups, {[index] : getUpdate(index, groupIdsChain)});
        return updatedGroups;
    }
}

function updateGroup(groups, groupIdsChain, updateObj){
    return updateGroupStrategy(groups, groupIdsChain)(()=> updateObj)
}

function updateSubGroup(groups, groupIdsChain, updateObj){
    return updateGroupStrategy(groups, groupIdsChain)((groupIndex, groupIdsChain)=> {
        let subGroupIndex = getItemIndex(groups[groupIndex].children, groupIdsChain[1]);
        return {children : {[subGroupIndex] : updateObj}};
    })
}

function getDefaultSelectedItem(menuItems, currentState){
    let selectedItem = currentState.selectedGroupId != null ?
        menuItems.find(item => item._id == currentState.selectedGroupId) :
        menuItems.find(item => item.isDefault == true);
    return selectedItem != null ? selectedItem : menuItems[0];
}

function buildDynamicItems(categories){
    return categories.map(category=>{
        return new ItemsGroup(category._id, category.name, null, category.subCategories,
            category.img, category.disporder, category.isDefault, category.items);
    })
}

function getDefaultSelectedSubItem(item, currentState){
    let result;
    if (item != null && item.children != null){
        result = item.children.find(item => item._id == currentState.selectedSubGroupId);
    }
    return result || {};
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