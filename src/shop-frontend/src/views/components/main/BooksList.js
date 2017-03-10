/**
 * Created by roman_b on 2/28/2017.
 */
import React from 'react';
import BookItem from './BookItem';
import ItemsList from './ItemsList';

import {getLocalizedLabel} from '../../../utils/localization-util';
import '../../../../resources/styles/components/books-list.less'

export const BooksList = (props) =>{
    return  <section className="books-list-container">
                <section className="books-list-container_header">
                   <h1>{getLocalizedLabel(props.headerNameKey, props.headerDefaultName)}</h1>
                </section>
                <ItemsList
                    itemRenderer={BookItem}
                    dataProvider={props.books}/>
            </section>
}