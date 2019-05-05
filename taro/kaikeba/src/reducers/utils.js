export function updateObject (oldObject, newValues) {
  return Object.assign({}, oldObject, newValues)
}

export function updateItemInArray (array, updateIfNeed, updateItemCallback) {
  return array.map(item => !updateIfNeed(item) ? item : updateItemCallback(item))
}

export function createReducer (initialState, handlers) {
  return function reducer (state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
