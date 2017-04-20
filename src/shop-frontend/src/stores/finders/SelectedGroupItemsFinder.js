/**
 * Created by roman_b on 4/14/2017.
 */
import {getSelectedGroup} from './GroupFinder';
import {getStore} from '../app-store';
import SelectedGroupDataFinder from './SelectedGroupDataFinder';

export default class SelectedGroupItemsFinder extends SelectedGroupDataFinder{

    constructor(){
        super();
    }

    getData(){
        return this.selectedGroup.items;
    }
}