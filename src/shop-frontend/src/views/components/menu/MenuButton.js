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

    constructor(props){
        super(props);
        this.states = ['default', 'over', 'selected'];
    }

    render(){
        let bgImage = {
            backgroundImage: `url(${getBaseURL()}${this.getImgName(this.props.imgPath, this.getStateName())})`,
            backgroundPosition: 'center 8px',
            backgroundRepeat: 'no-repeat'
        };
        bgImage.transition = this.getStateName() == 'over' ? 'background 0.3s ease-in-out' : null;
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
                    <section className="hidden">
                        {
                            this.states.map((state, index) =>{
                                return this.createImage(`${getBaseURL()}${this.getImgName(this.props.imgPath, state)}`, index);
                            })
                        }
                    </section>
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

    getImgName(imgName, stateName){
        if (this.isDefaultState()){
            return imgName;
        }
        let reg = new RegExp('[^-]+$');
        let res = reg.exec(imgName);
        imgName = imgName.slice(0, res.index) + stateName + '-' + imgName.slice(res.index);
        return imgName;
    }

    loadImagesInCache(){
        let states = ['default', 'over', 'selected'];
        let images = states.map(state => {
            let img = new Image();
            img.src = `${getBaseURL()}${this.getImgName(this.props.imgPath, state)}`;
            return img;
        })
        return images;
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

