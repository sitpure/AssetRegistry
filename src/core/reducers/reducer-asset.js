import constants from 'core/types'

const initialState = {
    assetURLData: null,
    assetImgBuffer: null,
  assetHash: '',
  alreadyExists: false,
    error: '',
    assetCount: 0,
  transaction: null,
    success: false,
    email: '',
    name: '',
    desc: '',
    tags: '',
    price: 0,
    id : null
}

export function assetReducer(state = initialState, action) {
  switch (action.type) {

  case constants.ADD_ASSET:
    return Object.assign({}, state, {
        assetURLData: action.assetURLData, assetImgBuffer: action.assetImgBuffer, assetHash: action.assetHash
    })
    case constants.ADD_ASSET_HASH:
        return Object.assign({}, state, {
            assetHash: action.assetHash[0]
        })
    case constants.ADD_ASSET_DETAILS:
        return Object.assign({}, state, {
            name: action.name,
            email: action.email,
            desc: action.desc,
            tags: action.tags,
            price: action.price            
    })

  case constants.CREATE_ASSET:
    return Object.assign({}, state, {
      ...action
    })

  case constants.CHECK_ASSET:
    return Object.assign({}, state, {
      assetHash: action.assetHash,
      alreadyExists: action.alreadyExists
    })
   case constants.GET_ASSET_COUNT:
    return Object.assign({}, state, {
        assetCount: action.assetCount
    })


  case constants.ASSET_ERROR:
    return Object.assign({}, state, {
      error: action.error
    })

  case constants.CLEAR_ASSETS:
    return initialState

  default:
    return state
  }
}
