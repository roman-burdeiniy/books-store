/**
 * Created by roman_b on 1/25/2017.
 */
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';


let mapStateToProps = function(state){
    return {locale : state.langStore.selectedLang,
            messages : state.langStore.messages}
}
let ConnectedItnlProvider = connect(mapStateToProps)(IntlProvider)
export default ConnectedItnlProvider