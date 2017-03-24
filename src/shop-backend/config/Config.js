/**
 * Created by roman_b on 3/14/2017.
 */
import path from 'path';
import {_extend} from 'util';

import * as devConf from './env/dev';
import * as prodConf from './env/prod';

class Config{
    constructor(){
        this.init();
    }

    init(){
        this.development = _extend(devConf, {});
        this.production = _extend(prodConf, {});
    }
}

export default new Config()[process.env.NODE_ENV || "development"];