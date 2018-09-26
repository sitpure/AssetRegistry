import constants from 'core/types'

const initialState = {
  id: null
}

export function accountReducer(state = initialState, action) {
  switch (action.type) {

      // Following cases represents selectors in redux
  case constants.SET_ACCOUNT:
    return Object.assign({}, state, {
      id: action.id
    })

  default:
    return state
  }
}
