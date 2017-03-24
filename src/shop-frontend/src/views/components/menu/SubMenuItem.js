/**
 * Created by roman_b on 1/30/2017.
 */
import React from 'react';
import {getResourceURL} from '../../../utils/url-utils';
import {Link} from 'react-router-dom'
import {generateSubCategoryRoute} from '../../../constants/RoutesToActionsMap';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/sub-menu-item.less');
}

export default class SubMenuItem extends React.Component{
    render(){
        let bgImage = {
            backgroundImage: `url(${getResourceURL(this.props.data.img)}`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        };

        return <section className="sub-menu-item">
            <Link className={this.props.isSelected ? 'selected' : ''}
                  to={generateSubCategoryRoute(this.props.selectedCatId, this.props.data._id)}>
              <section className="sub-menu-item-content">
                  <section className="sub-menu-item-image-holder" style={bgImage}/>
                  <span className="sub-menu-item-label">{this.props.data.name}</span>
              </section>
            </Link>
        </section>
    }
}