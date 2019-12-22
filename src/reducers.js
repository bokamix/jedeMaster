import { combineReducers } from 'redux'
import actorsReducer  from './reduxApp/actors/duck'
import logsReducer  from './reduxApp/logs/duck'

const rootReducer = combineReducers({
  actors: actorsReducer,
  logs: logsReducer
})

export default rootReducer
