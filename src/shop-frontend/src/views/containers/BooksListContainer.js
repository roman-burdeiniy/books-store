/**
 * Created by roman_b on 2/28/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {generateItemRoute} from '../../constants/RoutesToActionsMap';
import {BooksList} from '../components/main/BooksList';
import * as FindSelectedGroupStrategy from '../../stores/finders/FindSelectedGroupStrategy';

const mapStateToProps = function(state) {
    return {store: state,
        selectedGroupId : state.dataModel.selectedGroupId,
        selectedSubGroupId : state.dataModel.selectedSubGroupId}
}

const mapDispatchToProps = function(dispatch){
    return {
        onBookItemClick : function(ev){
            const route = generateItemRoute(this.props.selectedGroupId, this.props.selectedSubGroupId, ev.detail.id);
            //browserHistory.push(route);
        }
    }
}

export const populateBooksStrategy = (store)=>{
    return function(findFun){
        return findFun(store);
    }
}

class BooksListContainer extends React.Component {
    render() {
        return (<BooksList headerDefaultName={this.getHeaderDefaultName()}
                           headerNameKey={this.getHeaderNameKey()}
                           books={this.getBooksCollection()}/>);
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this).addEventListener('bookItemClick', this.props.onBookItemClick.bind(this));
    }

    get findStrategy(){
        return FindSelectedGroupStrategy;
    }

    getHeaderDefaultName(){
       return populateBooksStrategy(this.props.store)(this.findStrategy.getSelectedGroup).name;
    }

    getHeaderNameKey(){
        return populateBooksStrategy(this.props.store)(this.findStrategy.getSelectedGroup).localKey;
    }

    getBooksCollection(){
        return populateBooksStrategy(this.props.store)(this.findStrategy.getGroupItems);
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(BooksListContainer);