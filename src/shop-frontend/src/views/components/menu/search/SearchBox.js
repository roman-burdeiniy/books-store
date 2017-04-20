/**
 * Created by roman_b on 3/9/2017.
 */
import React from 'react';
import {PreSearchPopup} from './PreSearchPopup';
import {getLocalizedLabel} from '../../../../utils/localization-util';
import {ENTER, DOWN_ARROW, UP_ARROW} from '../../../../constants/KeyCodes';
import enhanceWithClickOutside from 'react-click-outside';

if(process.env.BROWSER) {
    require('../../../../../resources/styles/components/search/search-box.less');
}

class SearchBox extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {preSearchSelectedIndex : -1, searchPattern : '', isPreSearchHidden : true};
    }
    render(){
        return <section className="search-box">
            <input className="search-box_input"
                   value={this.state.searchPattern}
                   placeholder={this.context.intl.formatMessage({id:"search.box.search", defaultMessage: "Search..."})}
                   onKeyPress={this.handleKey(this.keyPressHandlers).bind(this)}
                   onKeyDown={this.handleKey(this.keyDownHandlers).bind(this)}
                   onChange={this.onSearchInputChange.bind(this)}/>
            <PreSearchPopup
                isHidden={this.state.isPreSearchHidden}
                itemClick={this.itemClick.bind(this)}
                selectedIndex={this.state.preSearchSelectedIndex}
                wordsTemp={this.state.searchPattern.split(/\s+/)}
                items={this.props.preSearchItems}/>
        </section>;
    }

    itemClick(item){
        const index = this.props.preSearchItems.indexOf(item);
        this.setSelectedIndex(index, function(){this.onSearchButtonClick()}.bind(this));
    }

    handleKey(keyHandlers) {
        return (ev) => {
            const key = ev.keyCode || ev.which;
            if (keyHandlers.hasOwnProperty(key)){
                ev.preventDefault();
                keyHandlers[key].call(this);
            }
        }
    }

    onSearchInputChange(ev){
        this.state.searchPattern = ev.target.value;
        this.setSelectedIndex(-1);
        if (this.state.searchPattern.length > 2){
            this.props.preSearchChange(this.state.searchPattern);
            this.showHidePreSearch(false);
        }
    }

    onSearchButtonClick(){
        this.showHidePreSearch(true);
        this.props.searchChange(this.state.searchPattern);
    }

    showHidePreSearch(isHidden){
        this.setState({...this.state, isPreSearchHidden : isHidden});
    }

    get keyPressHandlers(){
        return {
            [ENTER] : this.onSearchButtonClick
        }
    }

    get keyDownHandlers(){
        return {
            [DOWN_ARROW] : this.incrSelectedIndex,
            [UP_ARROW] : this.decrSelectedIndex
        }
    }

    incrSelectedIndex(){
        if (this.isLastIndexSelected()){
            this.setSelectedIndex(0);
        }else{
            this.setSelectedIndex(this.getSelectedIndex() + 1)
        }
    }

    decrSelectedIndex(){
        if (this.isFirstIndexSelected()){
            this.setSelectedIndex(this.props.preSearchItems.length - 1);
        }else{
            this.setSelectedIndex(this.getSelectedIndex() - 1)
        }
    }

    setSelectedIndex(value, callback){
        const searchPattern = value != -1 ? this.props.preSearchItems[value] : this.state.searchPattern;
        this.setState({preSearchSelectedIndex : value, searchPattern}, callback);
    }

    getSelectedIndex(){
        return this.state.preSearchSelectedIndex;
    }

    isLastIndexSelected(){
        return this.state.preSearchSelectedIndex == this.props.preSearchItems.length - 1
    }

    isFirstIndexSelected(){
        return this.state.preSearchSelectedIndex == 0;
    }

    handleClickOutside() {
        this.showHidePreSearch(true);
    }
}

SearchBox.contextTypes = {intl: React.PropTypes.object};

export default enhanceWithClickOutside(SearchBox);