/**
 * Created by roman_b on 1/25/2017.
 */
import {LOAD_TRANSLATIONS_SUCCESS, SELECT_LANG, INIT_LANGS} from '../constants/ActionTypes'
import update from 'immutability-helper';
//let mes = require('../../resources/locales/ru-RU');
//const en_US = {code: 'en-US', name: 'English'};
//const ru_RU = {code: 'ru-RU', name: 'Русский'};

let initialState = {langs : [], selectedLang : 'en', messages: null};

export default function langStore(state = initialState, action){
    switch (action.type) {
        case INIT_LANGS:
            return {...state, langs : action.langs, selectedLang : action.defaultLocale.code, messages: action.messages}
        case SELECT_LANG:
            return {...state, selectedLang : action.langCode};
        case LOAD_TRANSLATIONS_SUCCESS:
            return {...state, messages : action.payload};
        default:
            return state
    }
}
