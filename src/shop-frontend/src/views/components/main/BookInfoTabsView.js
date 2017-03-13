/**
 * Created by roman_b on 3/9/2017.
 */
import React from 'react';
import {getLocalizedLabel} from '../../../utils/localization-util';
import _ from 'underscore';

import '../../../../resources/styles/components/book-info-tabs-view.less';

export default class BookInfoTabsView extends React.Component{

    constructor(props){
        super(props);
        this.state = {selected : BookInfoTabsView.DESCRIPTION,
            items: [BookInfoTabsView.DESCRIPTION, BookInfoTabsView.DETAILS]}
    }

    render(){
            return <section className="book-info-tabs-view">
                    <section className="book-info-tabs-view_header">
                        <section className="header-label" type={BookInfoTabsView.DESCRIPTION}
                                 onClick={this.onSelect.bind(this)}>{getLocalizedLabel('book.details.description', 'Description')}</section>
                        <section className="header-label" type={BookInfoTabsView.DETAILS}
                                 onClick={this.onSelect.bind(this)}>{getLocalizedLabel('book.details.details', 'Details')}</section>
                    </section>
                    <hr className="divider"/>
                    <hr className={this.getIndicatorClass()}/>
                    <section className="tab-content-holder">
                        <section className={this.getTabClass('book-info-tabs-view_description-holder', BookInfoTabsView.DESCRIPTION)}>
                            {this.props.book.description}
                        </section>
                        <section className={this.getTabClass('book-info-tabs-view_details-holder', BookInfoTabsView.DETAILS)}>
                            <ul>
                                {this.getGeneralListItem(this.props.book.language_id, 'book.details.language', 'Language:')}
                                {this.getGeneralListItem(this.props.book.dimensions, 'book.details.dimensions', 'Dimensions:')}
                                {this.getWeightItem()}
                                {this.getGeneralListItem(this.props.book.ISBN, 'book.details.ISBN', 'ISBN:')}
                            </ul>
                        </section>
                    </section>
            </section>
    }

    getIndicatorClass(){
        return `selection-indicator selection-indicator_${this.state.items.indexOf(this.state.selected)}`;
    }

    getTabClass(tabClass, type){
        return tabClass + (this.state.selected == type ? '' : ' hide');
    }

    onSelect(ev){
        this.setState({...this.state, selected : ev.currentTarget.getAttribute('type')});
    }

    getGeneralListItem(value, localKey, defTitleValue){
        let result = this.getListItem(value, localKey, defTitleValue)((value) => {
            return <span>{value}</span>
        })
        return result;
    }

    getListItem(value, localKey, defTitleValue){
        return function(contentFun){
            if (value == null)
                return '';
            return <li><section className="list-item-title">{getLocalizedLabel(localKey, defTitleValue)}</section>
                {contentFun(value)}
            </li>
        }
    }

    getWeightItem(){
        let result = this.getListItem(this.props.book.weight, 'book.details.weight', 'Shipping weight:')((value) => {
                return <span>{value} {getLocalizedLabel('weight.kg', 'kg')}</span>
            })
        return result;
    }

}

BookInfoTabsView.DESCRIPTION = 'DESCRIPTION';
BookInfoTabsView.DETAILS = 'DETAILS';