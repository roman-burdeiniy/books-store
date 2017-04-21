/**
 * Created by roman_b on 1/18/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import ItemsGroup from '../../../stores/ItemsGroup';
import {getLocalizedLabel} from '../../../utils/localization-util';
import {EXPANDED_CATEGORY} from '../../../constants/PathKeys';
import RouteManager from '../../../managers/RouteManager';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/menu-button.less');
}

export default class MenuButton extends React.Component{

    constructor(props){
        super(props);
        this.states = ['default', 'over', 'selected'];
    }

    render(){
        let bgImage = {
            backgroundImage: `url(${this.getImgName(this.props.imgPath, this.getStateName())})`,
            backgroundPosition: 'center 8px',
            backgroundRepeat: 'no-repeat'
        };
        bgImage.transition = this.getStateName() == 'over' ? 'background 0.3s ease-in' : null;
        return <li onMouseOver={this.onMouseOver.bind(this)}
                   onMouseOut={this.onMouseOut.bind(this)}
                   itemID={this.props.id}
                   className={'menu-button' + this.getClassName()}>
                    <a href={this.getLink()} onClick={this.onClick.bind(this)}>
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
                        <section className="hidden">
                            {
                                this.states.map((state, index) =>{
                                    return this.createImage(`${this.getImgName(this.props.imgPath, this.getStateName())}`, index);
                                })
                            }
                        </section>
                    </a>
              </li>
    }

    createImage(src, index){
        return <img src={src} key={index} />;
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

    getLink(){
        return ItemsGroup.convert(this.props.data).getPath();
    }

    onClick(ev){
        ev.preventDefault();
        RouteManager.push(this.getLink());
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

    getImgName(imgName, stateName){
        if (this.isDefaultState()){
            return imgName;
        }
        let reg = new RegExp('[^-]+$');
        let res = reg.exec(imgName);
        imgName = imgName.slice(0, res.index) + stateName + '-' + imgName.slice(res.index);
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

