/**
 * Created by roman_b on 1/25/2017.
 */
import {LOAD_TRANSLATIONS_SUCCESS, LOAD_TRANSLATIONS_ERROR, INIT_LANGS} from '../constants/ActionTypes';

const en_US = {code: 'en-US', name: 'English'};
const ru_RU = {code: 'ru-RU', name: 'Русский'};
const ALL = [en_US, ru_RU];
const DEFAULT = ru_RU;

let defaultMessages = require(`../../resources/locales/ru-RU`);

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

export const initDefaultLocale = function(){
    return initDefaultSuccess(DEFAULT, defaultMessages, ALL);
}

export function initDefaultSuccess(locale, messages, langs){
    return {
        type: INIT_LANGS,
        defaultLocale : locale,
        langs : langs,
        messages: messages
    };
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