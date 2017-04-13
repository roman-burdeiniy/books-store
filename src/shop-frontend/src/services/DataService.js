/**
 * Created by roman_b on 3/3/2017.
 */
import 'isomorphic-fetch';
import {handleServerError, handleConnectionError} from '../errors/ErrorsHandler';
import _ from 'underscore';

const GET_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const POST_HEADERS = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
}

export const loadData = (endPoint, params = [], isMandatoryParams = false) =>{
    const paramsStr = params.filter(param => param != null).join('/');
    if (isMandatoryParams && _.isEmpty(paramsStr))
        return Promise.resolve({});
    const url = `${endPoint}${paramsStr}`;
    return call(url, 'GET', GET_HEADERS);
}

export const sendData = (endPoint, data) =>{
    return call(endPoint, 'POST', POST_HEADERS, data);
}

const call = (endPoint, method, headers, data = null) => {
    return new Promise((result, reject) => {
        let config = {
            method: method,
            headers
        }
        if (!_.isEmpty(data))
            config.body = JSON.stringify(data);
        fetch(endPoint, config)
            .then(res => {
                return res.json();
            })
            .then(response => {
                if (isError(response)){
                    handleServerError(response.error);
                    reject(response.error);
                }else{
                    result(response)
                }
            })
            .catch(err => {
                handleConnectionError(err, endPoint);
                reject(err);
            })
    })
}

const isError = (response) => {
    return response != null && response.hasOwnProperty('error');
}