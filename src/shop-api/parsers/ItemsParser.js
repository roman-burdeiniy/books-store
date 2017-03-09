/**
 * Created by roman_b on 3/3/2017.
 */
import _ from  'underscore';

export default class ItemsParser{

    getFirstCategory(parse){
        return (categories) =>{
            return !_.isEmpty(categories) ? parse(categories[0]) : [];
        }
    }

    parseCategoryItems(category){
        return category.items;
    }

    parseSubCategoryItems(category){
        if (category.subCategories == null)
            return null;
        let result = category.subCategories.reduce((prev, current) => {
            return current.items == null ? prev : prev.concat(current.items);
        }, []);
        return result;
    }

    parseAllItems(categories){
        return function(filter){
            let res = categories.reduce((prev, current) => {
                let result = this.concatItems(prev, this.parseCategoryItems(current));
                result = this.concatItems(result, this.parseSubCategoryItems(current))
                return result;
            }, [])
            return filter != null? res.filter(filter) : res;
        }
    }

    parsePopulars(categories){
        return this.parseAllItems(categories).call(this, item => item.isPopular)
    }

    parseItemById(categories, id){
        let result = this.parseAllItems(categories).call(this, item => item._id == id);
        return !_.isEmpty(result) ? result[0] : [];
    }

    concatItems(prevItems, items){
        return !_.isEmpty(items)?
            prevItems.concat(items) : prevItems;
    }
}