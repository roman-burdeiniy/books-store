/**
 * Created by roman_b on 1/20/2017.
 */
import { LOAD_CATEGORIES_SUCCESS , LOADING_CATEGORIES, LOAD_CATEGORIES_ERROR} from '../constants/ActionTypes';

let initialState = {categoriesList : {categories : [], isLoading : false, error: null}};

export default function categories(state = initialState, action){
    switch (action.type) {
        case LOADING_CATEGORIES:
            return {...state, categoriesList : categoriesLoading(state.categoriesList)};
        case LOAD_CATEGORIES_SUCCESS:
            return {...state, categoriesList : {categories: [...action.payload], error:null, isLoading : false}};
        case LOAD_CATEGORIES_ERROR:
            return {...state, categoriesList : categoriesError(state.categoriesList, action)};
        default:
            return state
    }
}

function categoriesLoading(state){
    return {...state, isLoading : true}
}


function categoriesError(state, action){
    return {...state, error : action.payload}
}