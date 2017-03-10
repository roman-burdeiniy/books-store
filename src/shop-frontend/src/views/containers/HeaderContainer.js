/**
 * Created by roman_b on 1/23/2017.
 */
import React from 'react';
import _ from 'underscore';
import {connect} from 'react-redux';
import MenuButtonsList from '../components/menu/MenuButtonsList'
import {fetchMenuItems, expandMenuItem, selectMenuItem,
    selectLanguage, selectSubMenuItem, collapseMenuItem} from '../../actions/menu'
import Logo from '../components/menu/Logo';
import LangSelector from '../components/menu/LangSelector';
import SubMenuView from '../components/menu/SubMenuView';
import SearchBox from '../components/menu/SearchBox';
import ShoppingCart from '../components/menu/ShoppingCart';
import {getItemById} from '../../utils/array-utils';

import '../../../resources/styles/containers/header.less';

const mapStateToProps = function(state) {
    return {menuItems: state.dataModel.groups,
        selectedItemId : state.dataModel.selectedGroupId,
        expandedItemId : state.dataModel.expandedGroupId,
        selectedSubItemId : state.dataModel.selectedSubGroupId,
        langStore : state.langStore}
}

const mapDispatchToProps = function(dispatch){
    return {
        initMenuData: function(){
            dispatch(fetchMenuItems())
        },
        onMenuButtonClick : function(menuItem){
            if (menuItem.hasChildren())
                dispatch(expandMenuItem(menuItem._id));
        },
        onSubMenuClose : function(){
            dispatch(collapseMenuItem());
        },
        onSelectLanguage: function(langCode){
            dispatch(selectLanguage(langCode))
        }
    }
}

class HeaderContainer extends React.Component{
    componentDidMount(){
        this.props.initMenuData();
    }

    render(){
        if (this.props.menuItems == null)
            return null;
        return <section className="header">
                <Logo/>
                <section className="menu-holder">
                    <MenuButtonsList
                        dataProvider={this.props.menuItems}
                        selectedItemId={this.props.selectedItemId}
                        expandedItemId={this.props.expandedItemId}
                        onButtonClick={this.props.onMenuButtonClick}/>
                   <section className="search-cart-holder">
                       <ShoppingCart/>
                       <SearchBox onTopPosition={this.props.isCardViewActive}/>
                   </section>
                    <SubMenuView
                        dataProvider={this.getSubItems()}
                        selectedItemId={this.props.selectedSubItemId}
                        selectedCatId={this.props.expandedItemId}
                        clickOutside={this.props.onSubMenuClose}/>
                </section>

            </section>
    }

    getSubItems(){
        if (_.isEmpty(this.props.menuItems) || this.props.expandedItemId == null)
            return null;
        let selectedMenuItem = getItemById(this.props.menuItems, this.props.expandedItemId);
        return selectedMenuItem != null ? selectedMenuItem.children : null;
    }
}

/*<LangSelector
 onSelectedLangChange={this.props.onSelectLanguage}
 langStore={this.props.langStore}/>*/

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);