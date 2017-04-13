/**
 * Created by roman_b on 4/11/2017.
 */
import {connect} from 'react-redux';
import React from 'react';
import _ from 'underscore';

import ErrorsView from '../../components/error/ErrorsView';

const mapStateToProps = function(state) {
    return {errors : state.errors};
}

const mapDispatchToProps = function(dispatch){
    return {

    }
}

class ErrorContainer extends React.Component {
    render(){
        if (_.isEmpty(this.props.errors))
            return null;
        return <ErrorsView
            errors={this.props.errors}/>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer);