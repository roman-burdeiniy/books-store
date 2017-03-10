/**
 * Created by roman_b on 3/9/2017.
 */
import React from 'react';
import '../../../../resources/styles/components/search-box.less';
import {getLocalizedLabel} from '../../../utils/localization-util';

export default class SearchBox extends React.Component{
    render(){
        return <section className="search-box">
            <input className="search-box_input"/>
            <button className="search-box_button">{getLocalizedLabel('search.box.search', 'Search')}</button>
        </section>;
    }

}