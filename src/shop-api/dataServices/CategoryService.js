/**
 * Created by roman_b on 1/16/2017.
 */
export default class CategoryService{
    constructor(dbProvider){
        this.dbProvider = dbProvider;
    }
    getAll(){
        let collection = this.dbProvider.db.get('categories');
        return collection.find({});
    }

    find(categoryId){
        return null;
    }

    add(category){
        return null;
    }

    remove(categoryId){
        return null;
    }

    update(category){
        return null;
    }
}
