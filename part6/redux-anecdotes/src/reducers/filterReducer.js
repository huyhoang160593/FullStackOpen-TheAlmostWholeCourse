const initialState = ''

const {NEW_FILTER} = {
  NEW_FILTER: "NEW_FILTER"
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_FILTER:
      return action.payload;
    default: return state
  }
}

export const changeFilter = (newFilter) => {
  return {
    type: NEW_FILTER,
    payload: newFilter
  }
}

export default reducer