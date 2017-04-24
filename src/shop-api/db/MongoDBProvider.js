/**
 * Created by roman_b on 1/4/2017.
 */
import monk from 'monk';
import mongodb from 'mongodb';
import config from '../../../data/scripts/config/config';

class MongoDBProvider{
    constructor(){
       this.db = monk(config.dbURI);
    }
}

export default new MongoDBProvider();
