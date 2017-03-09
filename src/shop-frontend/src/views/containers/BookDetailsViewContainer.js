/**
 * Created by roman_b on 3/1/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import BookDetailsView from '../components/main/BookDetailsView';

const mapStateToProps = function(state) {
    return {selectedBook : state.dataModel.selectedItem}
}

const mapDispatchToProps = function(dispatch){
    return {}
}

class BookDetailsViewContainer extends React.Component{
        render(){
            return <BookDetailsView book={this.props.selectedBook}/>
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsViewContainer);