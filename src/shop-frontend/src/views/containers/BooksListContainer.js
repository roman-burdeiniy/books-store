/**
 * Created by roman_b on 2/28/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {generateItemRoute} from '../../constants/RoutesToActionsMap';
import { browserHistory } from 'react-router';
import {BooksList} from '../components/main/BooksList';

const mapStateToProps = function(state) {
    return {store: state,
        selectedGroupId : state.dataModel.selectedGroupId,
        selectedSubGroupId : state.dataModel.selectedSubGroupId}
}

const mapDispatchToProps = function(dispatch){
    return {
        onBookItemClick : function(ev){
            const route = generateItemRoute(this.props.selectedGroupId, this.props.selectedSubGroupId, ev.detail.id);
            browserHistory.push(route);
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
        return (<BooksList headerName={this.getHeaderName()}
                           books={this.getBooksCollection()}/>);
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this).addEventListener('bookItemClick', this.props.onBookItemClick.bind(this));
    }

    get findStrategy(){
        return this.props.route.findStrategy;
    }

    getHeaderName(){
       return populateBooksStrategy(this.props.store)(this.findStrategy.getGroupName);
    }
    getBooksCollection(){
        return populateBooksStrategy(this.props.store)(this.findStrategy.getGroupItems);
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(BooksListContainer);