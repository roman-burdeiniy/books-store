/**
 * Created by roman_b on 3/3/2017.
 */
export default class ServiceBase{
    constructor(dbProvider){
        this.dbProvider = dbProvider;
    }
    dbCallBuilder(collection, ...params){
        return function(find, parse){
            let result = new Promise((success, reject) => {
                find(collection, params)
                    .then(res => {
                        success(parse(res, ...params));
                    })
                    .catch(err => {
                        reject(err)
                    });
            });

            return result;
        }
    }
}