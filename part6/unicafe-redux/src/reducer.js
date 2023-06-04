const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

export const BASE_ACTION = {
  GOOD: 'GOOD',
  OK: 'OK',
  BAD: 'BAD',
  ZERO: 'ZERO'
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case BASE_ACTION.GOOD:
      return {
        ...state,
        good: state.good + 1,
      }
    case BASE_ACTION.OK:
      return {
        ...state,
        ok: state.ok + 1,
      }
    case BASE_ACTION.BAD:
      return {
        ...state,
        bad: state.bad + 1,
      }
    case BASE_ACTION.ZERO:
      return initialState
    default: return state
  }

}

export default counterReducer
