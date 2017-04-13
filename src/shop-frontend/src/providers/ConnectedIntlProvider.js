/**
 * Created by roman_b on 1/25/2017.
 */
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';


let mapStateToProps = function(state){
    return {locale : state.langModel.selectedLang,
            messages : state.langModel.messages}
}
let ConnectedIntlProvider = connect(mapStateToProps)(IntlProvider)
export default ConnectedIntlProvider