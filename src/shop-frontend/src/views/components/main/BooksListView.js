/**
 * Created by roman_b on 2/28/2017.
 */
import React from 'react';
import BookItem from './../itemsList/BookItem';
import ItemsList from './../itemsList/ItemsList';

import {getLocalizedLabel} from '../../../utils/localization-util';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/main/page-view.less');
    require('../../../../resources/styles/components/main/books-list-view.less');
}

export const BooksListView = (props) =>{
    return  <section className="page-view books-list-view">
                <section className="page-view_header">
                   <h1>{getLocalizedLabel(props.headerNameKey, props.headerDefaultName)}</h1>
                </section>
                <ItemsList
                    itemRenderer={BookItem}
                    dataProvider={props.books}/>
            </section>
}