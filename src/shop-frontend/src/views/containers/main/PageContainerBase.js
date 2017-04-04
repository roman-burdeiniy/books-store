/**
 * Created by roman_b on 3/30/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {BooksListView} from '../../components/main/BooksListView';
import {getSelectedGroup} from '../../../stores/finders/GroupFinder';

export const baseMapStateToProps = function(state) {
    return {store: state}
}

export class PageContainerBase extends React.Component {

    get selectedGroup(){
       return getSelectedGroup(this.props.store);
    }

    getHeaderDefaultName(){
        return this.selectedGroup.name;
    }

    getHeaderNameKey(){
        return this.selectedGroup.localKey;
    }
    getData(){
        return this.selectedGroup.data;
    }

}