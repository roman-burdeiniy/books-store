/**
 * Created by roman_b on 3/21/2017.
 */
import {getStore} from '../stores/app-store';

export default function getConfig(){
    return getStore().getState().config;
}