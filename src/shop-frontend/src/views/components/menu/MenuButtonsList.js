/**
 * Created by roman_b on 1/23/2017.
 */
import React from 'react';
import MenuButton from './MenuButton';
import _ from 'underscore';

import '../../../../resources/styles/components/menu-buttons-list.less';

export default class MenuButtonsList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.dataProvider == null)
            return null;
        return <ul className="menu-buttons-list">
                    {
                        this.props.dataProvider.map((menuItem) =>{
                            return <MenuButton
                                onClick={this.props.onButtonClick}
                                data={menuItem}
                                label={menuItem.name}
                                id={menuItem._id}
                                isExpanded={this.isExpandedItem(menuItem._id)}
                                isSelected={this.isSelectedItem(menuItem._id)}
                                imgPath={menuItem.img}
                                localKey={menuItem.localKey}
                                key={menuItem._id}/>
                        })
                    }
                </ul>;
    }

    isSelectedItem(itemId){
        return this.props.selectedItemId == itemId;
    }

    isExpandedItem(itemId){
        return this.props.expandedItemId == itemId;
    }
}