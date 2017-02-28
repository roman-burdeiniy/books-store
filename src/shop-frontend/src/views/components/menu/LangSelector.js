/**
 * Created by roman_b on 1/25/2017.
 */
import React from 'react';

export default class LangSelector extends React.Component{
    constructor(props){
        super(props);
    }

    get store(){
        return this.props.langStore;
    }

    render(){
        if (this.store == null || this.store.langs == null){
            return;
        }
        return (
            <select className="lang-select"
                    onChange={this.onChange.bind(this)}
                    value={this.store.selectedLang}>
                {
                    this.store.langs.map((lang)=>{
                        return <option key={lang.code} value={lang.code}>{lang.name}</option>
                    })
                }
            </select>
        )
    }

    onChange(event){
        this.props.onSelectedLangChange(event.target.value);
    }
}
