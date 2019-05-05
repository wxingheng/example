import { CONFIG } from '../constants'
import { createReducer, updateObject } from './utils'

function config (state, action) {
  return updateObject(state, action.params)
}

export default createReducer({}, {
  [CONFIG]: config
})
