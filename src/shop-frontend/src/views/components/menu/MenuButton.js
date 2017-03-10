/**
 * Created by roman_b on 1/18/2017.
 */
import React from 'react';
import {PropTypes} from 'react';
import {getBaseURL} from '../../../utils/url-utils';
import {Link} from 'react-router';
import {getLocalizedLabel} from '../../../utils/localization-util';

import '../../../../resources/styles/components/menu-button.less';

export default class MenuButton extends React.Component{
    render(){
        let fullURL = getBaseURL();
        this.getImgName(this.props.imgPath);
        let bgImage = {
            backgroundImage: `url(${fullURL}${this.getImgName(this.props.imgPath)})`,
            backgroundPosition: 'center 8px',
            backgroundRepeat: 'no-repeat'
        };
        return <li onClick={this.onClick.bind(this)}
                   onMouseOver={this.onMouseOver.bind(this)}
                   onMouseOut={this.onMouseOut.bind(this)}
                   itemID={this.props.id}
                   className={'menu-button' + this.getClassName()}>
                    <Link to={this.props.data.getPath()}>
                        <section className="menu-button-holder"
                                 style={bgImage}>
                            <section className="menu-button-label">
                                {
                                    this.buildLabel()
                                }
                            </section>
                        </section>
                        {
                            this.props.isExpanded ? <section className="hover-arrow"/> : null
                        }
                    </Link>
              </li>
    }

    getStateName(){
        if (this.props.isSelected){
            return 'selected';
        }else if (this.isHover || this.props.isExpanded){
            return 'over';
        }else{
            return 'default';
        }
    }

    onClick(ev){
        this.props.onClick(this.props.data);
    }

    onMouseOver(ev){
        this.isHover = true;
        this.forceUpdate();
    }

    onMouseOut(ev){
        this.isHover = false;
        this.forceUpdate();
    }

    buildLabel(){
        return getLocalizedLabel(this.props.localKey, this.props.label);
    }

    getClassName(){
        return !this.isDefaultState() ? '-' + this.getStateName() : '';
    }

    getImgName(imgName){
        if (this.isDefaultState()){
            return imgName;
        }
        let reg = new RegExp('[^-]+$');
        let res = reg.exec(imgName);
        imgName = imgName.slice(0, res.index) + this.getStateName() + '-' + imgName.slice(res.index);
        return imgName;
    }

    isDefaultState(){
        return this.getStateName() == 'default';
    }
}



MenuButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

