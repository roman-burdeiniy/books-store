/**
 * Created by roman_b on 1/23/2017.
 */
import React from 'react'
import {connect} from 'react-redux';
import HeaderContainer from './containers/HeaderContainer';
import FooterContainer from './containers/FooterContainer';
import {initDefaultLocale} from '../actions/languages';
import {default as routeManager} from '../managers/RouteManager';

const mapStateToProps = function(state) {
    return state;
}

const mapDispatchToProps = function(dispatch){
 return {
            initDefaultLocale : function(){
                dispatch(initDefaultLocale())
            }
        }
 }

class App extends React.Component{
    constructor(props){
        super(props);
        routeManager.startListen();

    }
    componentDidMount(){
        this.props.initDefaultLocale();
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

export default connect(mapStateToProps, mapDispatchToProps)(App)

