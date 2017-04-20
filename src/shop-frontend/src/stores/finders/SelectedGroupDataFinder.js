/**
 * Created by roman_b on 4/14/2017.
 */
import {getSelectedGroup} from './GroupFinder';
import {getStore} from '../app-store';

export default class SelectedGroupDataFinder{
    constructor(){

    }

    get selectedGroup(){
        return getSelectedGroup(getStore().getState());
    }

    getHeaderDefaultName(){
        return this.selectedGroup.name;
    }

    getHeaderNameKey(){
        return this.selectedGroup.localKey;
    }
    getData(){
        return this.selectedGroup.data;
    }
}