import { createSlice } from '@reduxjs/toolkit'

/**
 * @typedef {string} NotificationType
 */

/**
 * @typedef {Object} State
 * @property {NotificationType} type
 * @property {string | null} message
 */

/**
 * @readonly
 * @enum {NotificationType}
 */
export const { ERROR, SUCCESS } = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
}

/**
 * @type {State}
 */
const initialState = {
  type: '',
  message: null,
}

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    /** @param {{payload: {type:NotificationType, message: string} }} action  */
    displayNotification(_state, action) {
      return action.payload
    },
    removeNotification() {
      return initialState
    },
  },
})

export const { displayNotification, removeNotification } =
  notificationReducer.actions

/**
 *
 * @param {State} notificationObject
 * @param {number} timeoutBySeconds
 * @returns {import("@reduxjs/toolkit").ThunkAction<void, import('store.js').RootState, unknown, import('@reduxjs/toolkit').AnyAction>}
 */
export const setNotification = (notificationObject, timeoutBySeconds = 5) => {
  return async (dispatch) => {
    dispatch(displayNotification(notificationObject))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeoutBySeconds * 1000)
  }
}

export default notificationReducer.reducer
