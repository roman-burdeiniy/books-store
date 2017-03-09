/**
 * Created by roman_b on 2/15/2017.
 */
import {LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_ERROR} from '../constants/ActionTypes';

let initialState = [];

export default function popularItems(state = initialState, action){
    switch (action.type) {
        case LOAD_CATEGORIES_SUCCESS:
            return getPopularItems(action.payload);
        case LOAD_CATEGORIES_ERROR:
            return initialState;
        default:
            return state
    }
}

function getPopularItems(categories){
    if (categories == null)
        return [];
    return categories.reduce((prevValue, currentValue) => {
        let items =  currentValue.subCategories != null ? currentValue.subCategories : [{items: currentValue.items}];
        let popularItems = reducePopular(items);
        return prevValue.concat(popularItems);
    }, []);
}

function reducePopular(items){
    return items.reduce((prevValue, currentValue) => {
        const items =  currentValue.items || [];
        return prevValue.concat(items.filter(item => item.isPopular));
    }, []);
}