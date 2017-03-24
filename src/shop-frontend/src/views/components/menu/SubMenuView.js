/**
 * Created by roman_b on 1/30/2017.
 */
import React from 'react';
import SubMenuItem from './SubMenuItem'
import enhanceWithClickOutside from 'react-click-outside';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/sub-menu-view.less');
}

class SubMenuView extends React.Component{
    render(){
        if (this.props.dataProvider == null){
            return null;
        }
        return <section className="sub-menu">
                    <section className="sub-menu-view" tabIndex="0" onBlur={this.collapse}>
                        {
                            this.props.dataProvider.map((menuItem) =>{
                                return <SubMenuItem
                                    data={menuItem}
                                    selectedCatId={this.props.selectedCatId}
                                    isSelected={this.props.selectedItemId == menuItem._id}
                                    key={menuItem.name}/>
                            })
                        }
                    </section>
                </section>
    }

    handleClickOutside() {
        if (this.props.dataProvider != null){
            this.props.clickOutside();
        }
    }


}

export default enhanceWithClickOutside(SubMenuView);