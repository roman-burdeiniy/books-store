/**
 * Created by roman_b on 1/25/2017.
 */
import {LOAD_TRANSLATIONS_SUCCESS, SELECT_LANG} from '../constants/ActionTypes'

let initialState = {langs : [], selectedLang : 'en', messages: null};

export default function langModel(state = initialState, action){
    switch (action.type) {
        case SELECT_LANG:
            return {...state, selectedLang : action.langCode};
        case LOAD_TRANSLATIONS_SUCCESS:
            return {...state, messages : action.payload};
        default:
            return state
    }
}
