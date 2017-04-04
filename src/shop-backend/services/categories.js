/**
 * Created by roman_b on 3/17/2017.
 */
import Config from '../config/Config';
import {loadData} from '../frontendSource/src/services/DataService';
import ItemsGroup from '../frontendSource/src/stores/ItemsGroup';

const contactsGroup = new ItemsGroup("contacts", "Contacts", "menu.button.contacts", null, '/img/menu/contacts-41x41.png', 999, false, null, true);
const popularGroup = new ItemsGroup("popular", "Popular", "menu.button.popular", null, '/img/menu/fav-lit-40x41.png', -999, true);

contactsGroup.data = {address: 'Рынок "Петровка", ул. Вербовая 17, кт.264'}

const staticGroups = [popularGroup, contactsGroup];

export const fetchCategories = function(initDefaultSelected) {
    let result = new Promise((success, reject) => {
        loadData(`${Config.apiEndpoint}/categories`)
            .then(result => success(buildCategoriesModel(result, initDefaultSelected)))
            .catch(error => reject(error))
    })
    return result;
}

function buildCategoriesModel(categories, initDefaultSelected){
    let groups =  sortItems(buildDynamicItems(categories).concat(staticGroups));
    let selectedGroup = initDefaultSelected ? getDefaultSelectedItem(groups) : ItemsGroup.NULL;
    let selectedSubGroup = initDefaultSelected ? getDefaultSelectedSubItem(selectedGroup) : ItemsGroup.NULL;
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