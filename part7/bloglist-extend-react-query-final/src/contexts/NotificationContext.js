import { createContext, useContext, useReducer } from 'react'

export const NotificationTypes = /** @type {const} */({
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
})
/** @typedef {typeof NotificationTypes} NotificationTypes */

export const ActionTypes = /** @type {const} */ ({
  DISPLAY_NOTIFICATION: 'DISPLAY_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
})
/** @typedef {typeof ActionTypes} ActionTypes */

/**
 * @typedef {Object} State
 * @property {NotificationTypes[keyof NotificationTypes]} type
 * @property {string} message
*/

/**
 * @typedef {Object} Actions
 * @property {ActionTypes[keyof ActionTypes]} type
 * @property {State} [payload]
 */

/** @type {State} */
const initState = ({
  type: NotificationTypes.SUCCESS,
  message: '',
})

/** @type {React.Reducer<State, Actions>} */
const notificationReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.DISPLAY_NOTIFICATION:
      return action.payload
    case ActionTypes.REMOVE_NOTIFICATION:
      return initState
    default:
      return state
  }
}

/** @type {React.Context<[State, React.Dispatch<Actions>]>} */
const NotificationContext = createContext(null)

/** @type {React.FC<React.PropsWithChildren>} */
export const NotificationContextProvider = ({ children }) => (
  <NotificationContext.Provider
    value={useReducer(notificationReducer, initState)}
  >
    {children}
  </NotificationContext.Provider>
)

export const useNotificationValue = () => {
  return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
  return useContext(NotificationContext)[1]
}

/** @param {React.Dispatch<Actions>} dispatch */
export const displayNotificationCurried = (dispatch) => {
  /**
   * @param {State} messageObject
   * @param {number} timeoutBySeconds
   * */
  return (messageObject, timeoutBySeconds = 5) => {
    dispatch({
      type: ActionTypes.DISPLAY_NOTIFICATION,
      payload: messageObject
    })
    setTimeout(() => {
      dispatch({
        type: ActionTypes.REMOVE_NOTIFICATION,
      })
    }, timeoutBySeconds * 1000)
  }
}