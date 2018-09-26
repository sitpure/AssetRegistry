import { combineReducers } from 'redux'
import { accountReducer }  from 'core/reducers/reducer-account'
import { assetReducer } from 'core/reducers/reducer-asset'
import { assetListReducer } from 'core/reducers/reducer-assetList'
import { providerReducer } from 'core/reducers/reducer-provider'
import { uiReducer }       from 'core/reducers/reducer-ui'
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
  account: accountReducer,
    asset: assetReducer,
    assetList: assetListReducer,  
  provider: providerReducer,
  ui: uiReducer,
  form: reduxFormReducer, 
})

export default rootReducer
