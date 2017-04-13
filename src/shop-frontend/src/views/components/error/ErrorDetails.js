/**
 * Created by roman_b on 4/11/2017.
 */
import React from 'react';
import {getLocalizedLabel} from '../../../utils/localization-util';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/error/error-details.less');
}

export const ErrorDetails = (props) => {
    return <section className="error-details-holder">
        {getLocalizedLabel(props.error.messageDescriptor.key,
            props.error.messageDescriptor.default)}
    </section>
}
