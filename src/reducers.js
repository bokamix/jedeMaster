import { combineReducers } from 'redux'
import actorsReducer  from './app/actors/duck'
import logsReducer  from './app/logs/duck'

const rootReducer = combineReducers({
  actors: actorsReducer,
  logs: logsReducer
})

export default rootReducer
