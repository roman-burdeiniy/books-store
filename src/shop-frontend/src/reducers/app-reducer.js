/**
 * Created by roman_b on 1/23/2017.
 */
import { combineReducers } from 'redux';
import categories from './categories';
import menu from './menu';
import langStore from './language';
import popularItems from './popularItems';
import route from './route';

export default combineReducers({
    categories,
    menu,
    langStore,
    popularItems
})