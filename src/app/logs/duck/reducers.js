import types from './types'


const INITIAL_STATE = {
  listName: 'Favourite',
  list: []
}

const logsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_LOG:
      return {
        ...state, list: [...state.list, action.item]
      }
    case types.RESET_LOGS:
      return {
        ...state, list: []
      }
    default:
      return state
  }
}

export default logsReducer
