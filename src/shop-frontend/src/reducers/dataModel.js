/**
 * Created by roman_b on 3/1/2017.
 */
import {SELECT_MENU_ITEM,
    SELECT_SUB_MENU_ITEM, EXPAND_MENU_ITEM, COLLAPSE_MENU_ITEM,
    LOAD_ITEMS_SUCCESS, LOADING_ITEMS, LOAD_ITEMS_ERROR, LOAD_SELECTED_ITEM_SUCCESS, LOAD_SELECTED_ITEM_ERROR} from '../constants/ActionTypes'
import _ from 'underscore';
import update from 'immutability-helper';
import {getItemById, getItemIndex} from '../utils/array-utils';

let initialState = {groups : [], selectedGroupId: null, selectedSubGroupId: null,
    expandedGroupId : null, isInitialized : false};

export default function dataModel(state = initialState, action){
    switch (action.type) {
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

export const getDefaultSelectedItem = (menuItems) => {
    let selectedItem = menuItems.find(item => item.isDefault == true);
    return selectedItem != null ? selectedItem : menuItems[0];
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