import { localStorageKeys } from 'misc/localStorageKeys'
import { createContext, useContext, useReducer } from 'react'
import blogsServices from 'services/blogs'
import loginService from 'services/login'

export const ActionTypes = /** @type {const} */ ({
  APPEND_USER: 'APPEND_USER',
  REMOVE_USER: 'REMOVE_USER',
})
/** @typedef {typeof ActionTypes} ActionTypes */

/**
 * @typedef {LoginUser | null} State
 */

/**
 * @typedef {Object} Actions
 * @property {ActionTypes[keyof ActionTypes]} type
 * @property {State} [payload]
 */

/** @type {State} */
const initState = null

/** @type {React.Reducer<State, Actions>} */
const loginUserReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.APPEND_USER:
      return action.payload
    case ActionTypes.REMOVE_USER:
      return initState
    default:
      return state
  }
}

/** @type {React.Context<[State, React.Dispatch<Actions>]>} */
const LoginUserContext = createContext(null)

/** @type {React.FC<React.PropsWithChildren>} */
export const LoginUserContextProvider = ({ children }) => (
  <LoginUserContext.Provider value={useReducer(loginUserReducer, initState)}>
    {children}
  </LoginUserContext.Provider>
)

export const useLoginUserValue = () => {
  return useContext(LoginUserContext)[0]
}

export const useLoginUserDispatch = () => {
  return useContext(LoginUserContext)[1]
}

/** @param {React.Dispatch<Actions>} dispatch */
export const loginToBlogCurried = (dispatch) => {
  /** @param {{username: string, password: string}} credential */
  return async (credential) => {
    try {
      /** @type {LoginUser} */
      const user = await loginService.login(credential)
      dispatch({
        type: ActionTypes.APPEND_USER,
        payload: user,
      })
      window.localStorage.setItem(
        localStorageKeys.LOGGER_BLOG_USER,
        JSON.stringify(user)
      )
      blogsServices.setToken(user.token)
    } catch (error) {
      return error
    }
  }
}

/** @param {React.Dispatch<Actions>} dispatch */
export const logoutCurried = (dispatch) => {
  return () => {
    window.localStorage.removeItem(localStorageKeys.LOGGER_BLOG_USER)
    dispatch({
      type: ActionTypes.REMOVE_USER,
    })
  }
}

/** @param {React.Dispatch<Actions>} dispatch */
export const getUserFromStorageCurried = (dispatch) => {
  return () => {
    const loggedUserJSON = window.localStorage.getItem(
      localStorageKeys.LOGGER_BLOG_USER
    )
    if (!loggedUserJSON) {
      return
    }
    const user = /** @type {LoginUser} */ (JSON.parse(loggedUserJSON))
    dispatch({
      type: ActionTypes.APPEND_USER,
      payload: user,
    })
    blogsServices.setToken(user.token)
  }
}
