/**
 * Created by roman_b on 4/11/2017.
 */
import React from 'react';
import {getLocalizedLabel, getLocalizedHTMLLabel} from '../../../utils/localization-util';
import {ErrorDetails} from './ErrorDetails';

if(process.env.BROWSER) {
    require('../../../../resources/styles/components/main/page-view.less');
    require('../../../../resources/styles/components/error/error-view.less');
}

export default class ErrorsView extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return <section className="page-view error-view">
                <section className="page-view_header">
                    <h1>{getLocalizedLabel('error.header', 'Sorry, an error occurred!')}</h1>
                </section>
                <section className="error-view-holder">
                    <section className="error-img"/>
                    <section className="error-message-holder">
                        <section className="error-details-header">
                            {getLocalizedHTMLLabel('error.details.header', "Oops... <br/>Something went wrong...")}
                        </section>
                        {this.props.errors.map(error =>
                            <ErrorDetails
                                key={error.id}
                                error={error}/>)}
                    </section>
                </section>

            </section>
    }
}