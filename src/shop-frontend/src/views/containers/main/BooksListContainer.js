/**
 * Created by roman_b on 2/28/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {PageContainerBase, baseMapStateToProps} from './PageContainerBase';
import {BooksListView} from '../../components/main/BooksListView';

class BooksListContainer extends PageContainerBase {
    render() {
        return (<BooksListView headerDefaultName={this.getHeaderDefaultName()}
                           headerNameKey={this.getHeaderNameKey()}
                           books={this.getData()}/>);
    }
}

export default connect(baseMapStateToProps)(BooksListContainer);