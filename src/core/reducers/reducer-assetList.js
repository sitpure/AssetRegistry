import constants from 'core/types'
import { assetListPropType } from 'core/types'
import _ from 'underscore'

const initialState = {
    items: [],
    assetCount: 0,
    error: ''
}

export function assetListReducer(state = initialState, action) {
    switch (action.type) {
        case constants.GET_ASSET:
          var newItem = [{ desc: action.asset[0], tags: action.asset[1], id: action.asset[2].toNumber(), price: action.asset[3].toNumber(), assetHash: action.asset[4] }] 
          return {
              ...state,
              items: _.uniq(_.union(state.items, newItem), true, _.property('id'))
          }

      case constants.GET_ASSET_COUNT:
          return Object.assign({}, state, {
              assetCount: action.assetCount.toNumber()
            })     
        case constants.ASSET_ERROR:
            return Object.assign({}, state, {
                error: action.error
            })

  default:
    return state
  }
}
