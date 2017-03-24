/**
 * Created by roman_b on 3/17/2017.
 */
const en_US = {code: 'en-US', name: 'English'};
const ru_RU = {code: 'ru-RU', name: 'Русский'};
const ALL = [en_US, ru_RU];
const DEFAULT = ru_RU;

let defaultMessages = require('../frontendSource/resources/locales/ru-RU');

export const getDefaultLocale = function(){
    return {defaultLocale : DEFAULT, messages : defaultMessages, langs : ALL, selectedLang : 'ru'};
}
