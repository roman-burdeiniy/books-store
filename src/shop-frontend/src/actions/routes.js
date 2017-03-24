/**
 * Created by roman_b on 2/2/2017.
 */
import {SET_ROUTE_LOCATION, APPLY_DEFAULT_ROUTE} from '../constants/ActionTypes';
import {getActionsMap, ACCEPTABLE_ROUTES, ACCEPTABLE_ROUTES_TEMPLATES} from '../constants/RoutesToActionsMap';
import {selectMenuItem, selectSubMenuItem} from './menu';
import {CATEGORY_ID, SUB_CATEGORY_ID, CATEGORY, SUB_CATEGORY, ITEM_ID, IS_EXPANDED} from '../constants/PathKeys';
import _ from 'underscore';
import {getRouteObject, getRouteParamsObject} from '../utils/route-utils';
import {getSelectedGroup} from '../stores/finders/FindSelectedGroupStrategy';
import {fetchItems, fetchSelectedItem} from './items';
import {getStore} from '../stores/app-store';
import ItemsGroup from '../stores/ItemsGroup';

export const setRouteLocation = function(pathname, params){
        let routeObj = getRouteObject(pathname);
        let paramsObject = getRouteParamsObject(params);
        return function(dispatch){
                const needItemsReload = isSelectedGroupChanged(routeObj, CATEGORY_ID, SUB_CATEGORY_ID);
                dispatchRouteState(dispatch, routeObj, CATEGORY_ID);
                dispatchRouteState(dispatch, routeObj, SUB_CATEGORY_ID);
                dispatchRouteState(dispatch, routeObj, ITEM_ID);
                dispatchRouteParamsState(dispatch, paramsObject);
                if (needItemsReload && isGroupSelectionRoute(routeObj) && !isItemSelection(routeObj)){
                    return dispatch(fetchItems(getDataModel().selectedGroupId, getDataModel().selectedSubGroupId))
                }
                return Promise.resolve({});
        }
}

function isSelectedGroupChanged(routeObj, catId, subCatId){
    let selectedGroup = getSelectedGroup(getStore().getState());
    return selectedGroup == ItemsGroup.NULL || _.isEmpty(selectedGroup.items) ||
        (routeObj != null && (selectedGroup._id != routeObj[catId] || selectedGroup._id != routeObj[subCatId]));
}

function isGroupSelectionRoute(routeObject){
    let selectedGroup = getSelectedGroup(getStore().getState());
    return !ItemsGroup.convert(selectedGroup).isStatic;
}

function isItemSelection(routeObject){
    return routeObject != null && routeObject[ITEM_ID]
}

function isDefaultSelectionRoute(routeObject){
    return routeObject == null;
}

function dispatchRouteState(dispatch, routeObject, key){
    dispatchActionByKey(routeObject, dispatch)(key);
}

function dispatchRouteParamsState(dispatch, paramsObject){
    Object.keys(paramsObject).forEach(dispatchActionByKey(paramsObject, dispatch));
}

function dispatchActionByKey(routeObject, dispatch){
    return function(key){
        if (routeObject != null && !_.isEmpty(routeObject[key]))
            dispatch(getActionsMap()[key](routeObject[key]));
    }
}

function getDataModel(){
    return getStore().getState().dataModel;
}

