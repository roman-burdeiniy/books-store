/**
 * Created by roman_b on 3/2/2017.
 */
import winston from 'winston';

const baseRouteDescriptor = {
    success: (res, result) => {
        return res.send(result)},
    error : (res, err) => {
        winston.error(err.message);
    }
}

const getRouteDescriptor = Object.create(baseRouteDescriptor);
getRouteDescriptor.type = 'GET';

const postRouteDescriptor = Object.create(baseRouteDescriptor);
postRouteDescriptor.type = 'POST'


export {getRouteDescriptor, postRouteDescriptor};