/**
 * Created by roman_b on 1/25/2017.
 */
import {LOAD_TRANSLATIONS_SUCCESS, LOAD_TRANSLATIONS_ERROR} from '../constants/ActionTypes';

const en_US = {code: 'en-US', name: 'English'};
const ru_RU = {code: 'ru-RU', name: 'Русский'};

export const fetchTranslations = function(langCode){
    return function(dispatch){
        try{
            switch (langCode){
                case en_US.code:{
                    require.ensure([], function(require) {
                        let messages = require(`../../resources/locales/en-US`);
                        dispatch(loadTranslationsSuccess(messages))
                    })
                    break;
                }
                case ru_RU.code:{
                    require.ensure([], function(require) {
                        let messages = require(`../../resources/locales/ru-RU`);
                        dispatch(loadTranslationsSuccess(messages))
                    })
                    break;
                }
            }
        }catch(e){
            dispatch(initDefaultLocale())
        }

    }
}

export function loadTranslationsSuccess(messages) {
    return {
        type: LOAD_TRANSLATIONS_SUCCESS,
        payload: messages
    };
}

export function loadTranslationsError(messages) {
    return {
        type: LOAD_TRANSLATIONS_ERROR,
        payload: messages
    };
}