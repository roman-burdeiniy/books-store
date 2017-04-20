/**
 * Created by roman_b on 4/14/2017.
 */
import {getSelectedGroup} from './GroupFinder';
import {getStore} from '../app-store';
import {MAIN_SEARCH} from '../../constants/SearchTypes';

export default class SearchResultItemsFinder{

    constructor(){

    }

    get searchModel(){
        return getStore().getState().searchModel[MAIN_SEARCH];
    }

    getHeaderDefaultName(){
        return 'Search results...';
    }

    getHeaderNameKey(){
        return 'search.results.view.header';
    }
    getData(){
        return this.searchModel.items;
    }
}