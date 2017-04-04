/**
 * Created by roman_b on 3/6/2017.
 */
import {getItemById} from '../../utils/array-utils';
import ItemsGroup from '../../stores/ItemsGroup';

export const getGroupItems = (state)=>{
    return getSelectedGroup(state).items;
}

export function getSelectedGroup(state){
    const groups = state.dataModel.groups;
    const selectedGroupId = state.dataModel.selectedGroupId;
    const selectedSubGroupId = state.dataModel.selectedSubGroupId;
    let group = getItemById(groups, selectedGroupId);
    let subGroup = group != null ? ItemsGroup.convert(group).getChildById(selectedSubGroupId) : null;
    return subGroup || group || ItemsGroup.NULL;
}

export function getGroupById(state, groupId){
    let group = getItemById(state.dataModel.groups, groupId);
    return group || ItemsGroup.NULL;
}