/**
 * Created by roman_b on 1/17/2017.
 */
import CategoryService from '../dataServices/CategoryService';
import MongoDBProvider from '../db/MongoDBProvider';
export default class CategoriesRoute{

    constructor(){
        this.service = new CategoryService(new MongoDBProvider());
    }

    register(router){
        router.get('/categories', function(req, res, next) {
            this.service.getAll().then(result => {
                res.send(result);
            }).catch(err => {
                res.send({error: 'Failed to get categories list'});
            });
        }.bind(this));
    }
}