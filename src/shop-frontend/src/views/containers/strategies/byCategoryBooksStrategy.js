/**
 * Created by roman_b on 2/28/2017.
 */
import {getItemById} from '../../../utils/array-utils';

export const populateHeaderName = (store)=>{
    return getCategory(store).name;
}

export const populateBooksCollection = (store)=>{
    return getCategory(store).items;
}

function getCategory(store){
    const categories = store.categories.categoriesList.categories;
    const selectedCatId = store.menu.selectedCatId;
    const selectedSubCatId = store.menu.selectedSubCatId;
    let category = getItemById(categories, selectedCatId);
    let subCategory = null;
    if (category != null && category.subCategories != null)
        subCategory = getItemById(category.subCategories, selectedSubCatId);
    return subCategory || category || {};
}
