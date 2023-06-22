import { createSlice } from '@reduxjs/toolkit'
import blogServices from 'services/blogs'
import loginServices from 'services/login'
import { ERROR, setNotification } from './notificationReducer'

const initialState = /** @type {LoginUser | null} */ (null)
const LOCAL_STORAGE_USER_KEY = 'loggedBlogUser'

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /** @param {{payload: LoginUser}} action  */
    setUser(_state, action) {
      return action.payload
    },
    removeUser(_state, _action) {
      return initialState
    },
  },
})

const { removeUser, setUser } = userReducer.actions

/**
 * @param {{username: string, password: string}} credential
 * @returns {import("@reduxjs/toolkit").ThunkAction<Promise<void | any>, import('store.js').RootState, unknown, import('@reduxjs/toolkit').AnyAction>}
 */
export const login = (credential) => {
  return async (dispatch) => {
    try {
      const successLoginUser = /** @type {LoginUser} */ (
        await loginServices.login(credential)
      )
      window.localStorage.setItem(
        LOCAL_STORAGE_USER_KEY,
        JSON.stringify(successLoginUser)
      )
      dispatch(receiveUserFromLocalStorage(successLoginUser))
    } catch (error) {
      dispatch(
        setNotification({
          type: ERROR,
          message: 'wrong username or password',
        })
      )
      return error
    }
  }
}

/**
 * @param {LoginUser} [loggedUser]
 * @returns {import("@reduxjs/toolkit").ThunkAction<Promise<void | any>, import('store.js').RootState, unknown, import('@reduxjs/toolkit').AnyAction>}
 */
export const receiveUserFromLocalStorage = (loggedUser) => {
  return async (dispatch) => {
    if (loggedUser) {
      blogServices.setToken(loggedUser.token)
      dispatch(setUser(loggedUser))
      return
    }
    const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    if (!loggedUserJSON) {
      return
    }
    const savedUser = /** @type {LoginUser} */ (JSON.parse(loggedUserJSON))
    blogServices.setToken(savedUser.token)
    dispatch(setUser(savedUser))
  }
}

/**
 * @returns {import("@reduxjs/toolkit").ThunkAction<Promise<void | any>, import('store.js').RootState, unknown, import('@reduxjs/toolkit').AnyAction>}
 */
export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
    dispatch(removeUser())
  }
}

export default userReducer.reducer
