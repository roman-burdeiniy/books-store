/**
 * Created by roman_b on 3/3/2017.
 */
import sanitize from 'mongo-sanitize';

export default class ServiceBase{
    constructor(dbProvider){
        this.dbProvider = dbProvider;
    }
    dbCallBuilder(collection, ...params){
        return function(dbCall, parse){
            let result = new Promise((success, reject) => {
                const cleanParams = params.map(param => (sanitize(param)));
                dbCall(collection, cleanParams)
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