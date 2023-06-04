import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(_state, action) {
      return action.payload
    },
    removeNotification(_state, _action) {
      return initialState
    }
  }
})
export const {displayNotification, removeNotification} = notificationReducer.actions
export const setNotification = (notificationContent, timeoutBySeconds = 5) => {
  return async dispatch => {
    dispatch(displayNotification(notificationContent))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeoutBySeconds * 1000);
  }
}
export default notificationReducer.reducer