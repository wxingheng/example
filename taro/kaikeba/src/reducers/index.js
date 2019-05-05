import { combineReducers } from 'redux'
import player from './player'
import config from './config'
import user from './user'

export default combineReducers({
  user,
  player,
  config
})
