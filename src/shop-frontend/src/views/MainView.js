/**
 * Created by roman_b on 1/23/2017.
 */
import React from 'react'
import {connect} from 'react-redux';
import HeaderContainer from './containers/HeaderContainer';
import FooterContainer from './containers/FooterContainer';

const mapStateToProps = function(state) {
    return state;
}

const mapDispatchToProps = function(dispatch){
 return {

        }
 }

class MainView extends React.Component{
    constructor(props){
        super(props);
        //routeManager.startListen();

    }
    render(){
        return (
            <section className="main-app">
                <section className="content">
                    <HeaderContainer />
                    {this.props.children}
                    <FooterContainer />
                </section>
            </section>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)

