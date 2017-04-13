/**
 * Created by roman_b on 1/16/2017.
 */
import ServiceBase from './ServiceBase';

export default class CategoryService extends ServiceBase{
    constructor(dbProvider){
        super(dbProvider);
    }
    getAll(){
        let collection = this.dbProvider.db.get('categories');
        let result = this.dbCallBuilder(collection)(this.findAllCategories, (res)=> res);
        return result;
    }

    findAllCategories(collection){
        return collection.find({});
    }
}
