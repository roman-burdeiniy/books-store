/**
 * Created by roman_b on 4/13/2017.
 */
import React from 'react';
import ItemsGroup from '../../stores/ItemsGroup';
import {Link} from 'react-router-dom';


if(process.env.BROWSER) {
    require('../../../resources/styles/controls/continue-shopping-link.less');
}

export const ContinueShoppingLink = (props, context) => {
    return  <Link className='continue-shopping-link'
                  to={ItemsGroup.convert(props.defaultGroup).getPath()}>
        {context.intl.formatMessage({id:"navigation.continue_shopping", defaultMessage: "Continue shopping"})}
    </Link>
}

ContinueShoppingLink.contextTypes = {intl: React.PropTypes.object};