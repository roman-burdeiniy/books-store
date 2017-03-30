/**
 * Created by roman_b on 2/15/2017.
 */
import _ from 'underscore';
import React from 'react';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

let getLocalizedLabel = function(key, defaultText, values = {}){
    return !_.isEmpty(key) ?
        <FormattedMessage
            id={key}
            defaultMessage={defaultText}
            values={values}/> :
        defaultText;
}

let getLocalizedHTMLLabel = function(key, defaultText, values = {}){
    return !_.isEmpty(key) ?
        <FormattedHTMLMessage
            id={key}
            defaultMessage={defaultText}
            values={values}/> :
        defaultText;

}

export {getLocalizedLabel, getLocalizedHTMLLabel};