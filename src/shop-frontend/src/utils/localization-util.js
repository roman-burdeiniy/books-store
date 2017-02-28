/**
 * Created by roman_b on 2/15/2017.
 */
import _ from 'underscore';
import React from 'react';
import {FormattedMessage} from 'react-intl';

let getLocalizedLabel = function(key, defaultText){
    return !_.isEmpty(key) ?
        <FormattedMessage
            id={key}
            defaultMessage={defaultText}/> :
        defaultText;
}

export {getLocalizedLabel};