/**
 * Created by roman_b on 4/18/2017.
 */
import React from 'react';
import _ from 'underscore';
import {PreSearchItemRenderer} from './PreSearchItemRenderer';
import {getDataDependentClassName} from '../../../../utils/string-utils';

if(process.env.BROWSER) {
    require('../../../../../resources/styles/components/search/pre-search-popup.less');
}

export const PreSearchPopup = (props) =>{
    if (_.isEmpty(props.items))
        return null;
    return <section className={getDataDependentClassName("pre-search-popup", !props.isHidden)()} >
        <ul className="pre-search-popup-list">
            {props.items.map((item) =>{
                return <PreSearchItemRenderer
                    isSelected={props.selectedIndex == props.items.indexOf(item)}
                    itemClick={props.itemClick}
                    wordsTemp={props.wordsTemp}
                    data={item}
                    key={item}/>
            })}
        </ul>
    </section>
}