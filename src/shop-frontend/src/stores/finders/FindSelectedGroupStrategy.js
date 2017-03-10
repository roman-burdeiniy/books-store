/**
 * Created by roman_b on 3/6/2017.
 */
import {getItemById} from '../../utils/array-utils';

export const getGroupItems = (store)=>{
    return getSelectedGroup(store).items;
}

export function getSelectedGroup(store){
    const groups = store.dataModel.groups;
    const selectedGroupId = store.dataModel.selectedGroupId;
    const selectedSubGroupId = store.dataModel.selectedSubGroupId;
    let group = getItemById(groups, selectedGroupId);
    let subGroup = group != null ? group.getChildById(selectedSubGroupId) : null;
    return subGroup || group || {};
}