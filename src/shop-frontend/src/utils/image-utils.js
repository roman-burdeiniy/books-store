/**
 * Created by roman_b on 3/30/2017.
 */
import {NO_BOOK_LOGO_URL, NO_BOOK_MAIN_IMG_URL} from '../constants/Imgs';
import _ from 'underscore';

export function getLogoURL(item){
    return item.logo != null ? item.logo : NO_BOOK_LOGO_URL;
}

export function getMainImageURL(item){
    let imgURL = getFirstImg(item);
    return imgURL != null ? imgURL : NO_BOOK_MAIN_IMG_URL;
}

function getFirstImg(item){
    return !_.isEmpty(item.imgs) ? item.imgs[0] : null;
}