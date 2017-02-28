/**
 * Created by roman_b on 1/31/2017.
 */
import React from 'react';
import '../../../../resources/styles/components/items-list.less'

export default class ItemsList extends React.Component{

    render(){
        if (this.props.dataProvider == null){
            return null;
        }
        return <section className="items-list-holder"><ul className="items-list">
            {
                this.props.dataProvider.map((item) =>{
                    return React.createElement(this.props.itemRenderer, {data:item, key : item._id});
                })
            }
        </ul></section>
    }
}