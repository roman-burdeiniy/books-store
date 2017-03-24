/**
 * Created by roman_b on 1/24/2017.
 */
import React from 'react';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/menu-logo.less');
}

const Logo = (params) =>
    <section className="logo">
        <section className="logo-content"/>
        <section className="logo-bottom"/>
    </section>

export default Logo;