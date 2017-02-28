/**
 * Created by roman_b on 1/30/2017.
 */
import React from 'react';
import '../../../../resources/styles/components/sub-menu-item.less';
import {getResourceURL} from '../../../utils/url-utils';
import {Link} from 'react-router';
import {generateSubCategoryRoute} from '../../../constants/RoutesToActionsMap';

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