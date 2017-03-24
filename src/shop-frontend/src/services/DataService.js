/**
 * Created by roman_b on 3/3/2017.
 */
import 'isomorphic-fetch';
import {handleServerError, handleConnectionError} from '../errors/ErrorsHandler';
import _ from 'underscore';

export const loadData = (endPoint, params = [], isMandatoryParams = false) =>{
    return new Promise((result, reject) => {
        const paramsStr = params.filter(param => param != null).join('/');
        if (isMandatoryParams && _.isEmpty(paramsStr))
            return;
        const url = `${endPoint}${paramsStr}`
        fetch(url,
            {method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }}).then(res => {
                return res.json();
            })
            .then(response => {
                result(parseResponse(response))
            })
            .catch(err => {
                handleConnectionError(err, url);
                reject(err);
            })
    })
}

const parseResponse = (response) => {
    if (response != null && response.hasOwnProperty('error')){
        handleServerError(response.error);
        return null;
    }
    return response;
}