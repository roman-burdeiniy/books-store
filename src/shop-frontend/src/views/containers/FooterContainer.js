/**
 * Created by roman_b on 1/27/2017.
 */
/**
 * Created by roman_b on 1/27/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

if(process.env.BROWSER) {
    require('../../../resources/styles/containers/footer.less');
}

const mapStateToProps = function(state) {
    return state;
}

const mapDispatchToProps = function(dispatch){
    return {};
}


class FooterContainer extends React.Component{
    componentDidMount(){

    }

    render(){
        return <footer className="footer">
            <hr/>
            <small>
                <b>© 2017 Books Shelf ® </b>
                <FormattedMessage
                    id="footer.rights.label"
                    defaultMessage="All rights reserved"/>
            </small>
        </footer>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);