/**
 * Created by roman_b on 4/19/2017.
 */
import React from 'react';
import {getDataDependentClassName} from '../../../../utils/string-utils';

if(process.env.BROWSER) {
    require('../../../../../resources/styles/components/search/pre-search-item-renderer.less');
}

export const PreSearchItemRenderer = (props) => {
    return <li className={getDataDependentClassName("pre-search-item-renderer", !props.isSelected)('selected')}
            onClick={onClick(props)}>
        <span dangerouslySetInnerHTML={applyMatchStyling(props.data, props.wordsTemp, props.isSelected)}></span>
    </li>
}

const onClick = (props) => (ev) => {
    props.itemClick(props.data)
}

const applyMatchStyling = (label, wordsTemp, isSelected) => {
    let result = label;
    if (!isSelected){
        wordsTemp.forEach(word => {
            let reg = new RegExp(word, 'i')
            result = result.replace(reg, '<b>$&</b>');
        })
    }
    return {__html : result};
}