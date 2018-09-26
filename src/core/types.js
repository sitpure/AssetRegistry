import keyMirror from 'keymirror'
import constants from 'core/types'
import PropTypes from 'prop-types'

export default keyMirror({
    GET_ASSET : null,
    GET_ASSET_COUNT: null,
    ADD_ASSETS: null,
    ADD_ASSET: null,
    ADD_ASSET_HASH  : null,
    ADD_ASSET_DETAILS: null,
  ASSET_ERROR: null,
  CHECK_ASSET: null,
  CLEAR_ACCOUNT: null,
  CLEAR_ASSETS: null,
  CLEAR_UI: null,
  CLOSE_LEFT_NAV: null,
  CLOSE_MODAL: null,
  CLOSE_RIGHT_NAV: null,
  CREATE_ASSET: null,
  OPEN_LEFT_NAV: null,
  OPEN_RIGHT_NAV: null,
  SET_ACCOUNT: null,
  SET_ACCOUNT_EMAIL: null,
  SET_PROVIDER: null,
  SHOW_MODAL: null
})


export const assetListPropType = PropTypes.shape({
    items : PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            desc: PropTypes.string
        })
    ),
    assetCount: PropTypes.number  
})

 