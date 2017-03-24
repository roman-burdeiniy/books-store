/**
 * Created by roman_b on 3/17/2017.
 */
import Config from '../config/Config';
import {loadData} from '../frontendSource/src/services/DataService';
import ItemsGroup from '../frontendSource/src/stores/ItemsGroup';

const contactsGroup = new ItemsGroup("contacts", "Contacts", "menu.button.contacts", null, '/img/menu/contacts-41x41.png', 999, false, null, true);
const popularGroup = new ItemsGroup("popular", "Popular", "menu.button.popular", null, '/img/menu/fav-lit-40x41.png', -999, true);

const staticGroups = [popularGroup, contactsGroup];

export const fetchCategories = function() {
    let result = new Promise((success, reject) => {
        loadData(`${Config.apiEndpoint}/categories`)
            .then(result => success(buildCategoriesModel(result)))
            .catch(error => reject(error))
    })
    return result;
}

function buildCategoriesModel(categories){
    let groups =  sortItems(buildDynamicItems(categories).concat(staticGroups));
    let selectedGroup = getDefaultSelectedItem(groups);
    let selectedSubGroup = getDefaultSelectedSubItem(selectedGroup);
    return {groups, selectedGroupId : selectedGroup._id,
        selectedSubGroupId : selectedSubGroup._id, isInitialized : true};
}

function getDefaultSelectedItem(menuItems){
    let selectedItem = menuItems.find(item => item.isDefault == true);
    return selectedItem != null ? selectedItem : menuItems[0];
}

function buildDynamicItems(categories){
    return categories.map(category=>{
        return new ItemsGroup(category._id, category.name, null, category.subCategories,
            category.img, category.disporder, category.isDefault, category.items);
    })
}

function getDefaultSelectedSubItem(item){
    let result;
    if (item != null && item.children != null){
        result = item.children.find(item => item => item.isDefault == true);
    }
    return result || {};
}

function sortItems(items){
    items.sort((item1, item2)=>{
        if (item1.disporder < item2.disporder){
            return -1;
        }else if(item1.disporder > item2.disporder){
            return 1;
        }
        return 0;
    });
    return items;
}