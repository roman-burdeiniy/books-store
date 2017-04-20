/**
 * Created by roman_b on 4/14/2017.
 */
import {LOADING_SEARCH_ITEMS, LOAD_SEARCH_ITEMS_SUCCESS,
    LOAD_SEARCH_ITEMS_ERROR, LOAD_PRE_SEARCH_ITEMS_SUCCESS} from '../constants/ActionTypes';

import {LOADING, SUCCESS, ERROR} from '../constants/LoadingStatus';
import {MAIN_SEARCH, PRE_SEARCH} from '../constants/SearchTypes';
import _ from 'underscore';
import {sortByBestMatch} from '../managers/SearchManager';
import {addUniqueByKey} from '../utils/map-utils';
import {getItemIndex} from '../utils/array-utils';
import {buildSearchTemplateWithPosition} from '../managers/SearchManager';

let initialState = {[PRE_SEARCH] : getInitSubState(),
    [MAIN_SEARCH] : getInitSubState()};

function getInitSubState(){
    return {searchPattern : null, items : [], status : null};
}

const updateSearchModel = (subType, itemsUpdater) => (state, action) => {
    switch (action.type) {
        case LOADING_SEARCH_ITEMS:{
            return {...state, [subType] : {searchPattern : action.searchPattern, status : LOADING}};
        }
        case LOAD_SEARCH_ITEMS_SUCCESS:{
            return {...state, [subType] : {items : itemsUpdater(state, action),
                searchPattern: action.searchPattern, status : SUCCESS}};
        }
        case LOAD_SEARCH_ITEMS_ERROR:{
            return {...state, [subType] : {items : [], searchPattern: action.searchPattern, status : ERROR}};
        }
        default:
            return state
    }
}

const mainSearchItemsUpdater = (state, action) =>{
    if (_.isEmpty(state[PRE_SEARCH].items))
        return action.items;
    const preSearchItems = state[PRE_SEARCH].items[action.searchPattern];
    const items = concatWithPreSearch(filterForStrictSearch(state, action), preSearchItems);
    return items;
}

const preSearchItemsUpdater = (state, action) =>{
    return groupItemsBySearchTag(action.items, action.searchPattern);
}

const searchTypesMap = {
    [MAIN_SEARCH]: updateSearchModel(MAIN_SEARCH, mainSearchItemsUpdater),
    [PRE_SEARCH]: updateSearchModel(PRE_SEARCH, preSearchItemsUpdater)
}


function groupItemsBySearchTag(items, searchPattern){
    if (_.isEmpty(items) || _.isEmpty(searchPattern))
        return [];
    let result = {};
    const temp = buildSearchTemplateWithPosition(searchPattern.split(/\s+/), true);
    const tester = new RegExp(temp, 'i');
    items.forEach(item => {
        let bestMatch = tester.exec(item.searchTags[0]);
        item.searchTags.forEach(tag => {
            let currentMatch = tester.exec(tag);
            if (bestMatch == null){
                bestMatch = currentMatch;
                return;
            }
            if (currentMatch != null && currentMatch.index < bestMatch.index){
                bestMatch = currentMatch;
            }
        })
        if (bestMatch != null){
            result = addUniqueByKey(result, bestMatch.input.toLowerCase(), item);
        }
    });
    return result;
}

const concatWithPreSearch = (items, preSearchItems) => {
    if (_.isEmpty(preSearchItems))
        return items;
    const remainList = items.filter(item => getItemIndex(preSearchItems, item._id) == -1)
    const result = preSearchItems.concat(remainList);
    return result;
}

export default function searchModel(state = initialState, action){
    return action.subType != null ? searchTypesMap[action.subType](state, action) : state;
}

export function getSearchPromptList(preSearchModel){
    if (_.isEmpty(preSearchModel.items))
        return []
    const result = sortByBestMatch(Object.keys(preSearchModel.items),
        preSearchModel.searchPattern.split(/\s+/))(item => item);
    return result;
}

function filterForStrictSearch(state, action){
    let result = action.items;
    if (isStrictSearch(state, action)){
        const words = action.searchPattern.split(/\s+/);
        result = action.items.filter(item => {
            const tester = new RegExp(buildSearchTemplateWithPosition(words, true, true), 'i');
            return tester.test(getSearchableSource(item));
        });
    }
    return result;
}

function getSearchableSource(item){
    return `${item.name} ${item.author} ${item.publisher}`;
}

function isStrictSearch(state, action){
    return state[PRE_SEARCH].items[action.searchPattern] != null;
}

