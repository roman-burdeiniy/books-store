/**
 * Created by roman_b on 2/28/2017.
 */
import React from 'react';
import BookItem from './BookItem';
import ItemsList from './ItemsList';

export const BooksList = (props) =>{
    return  <section className="books-list-container">
                <h1>{props.headerName}</h1>
                <ItemsList
                    itemRenderer={BookItem}
                    dataProvider={props.books}/>
            </section>
}