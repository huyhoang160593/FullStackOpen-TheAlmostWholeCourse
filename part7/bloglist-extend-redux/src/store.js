import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import blogsReducers from 'reducers/blogsReducers'
import notificationReducer from 'reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducers
  },
})

/** @typedef {ReturnType<typeof store.getState>} RootState */

/** @typedef {() => typeof store.dispatch} DispatchFunc */

/** @type {DispatchFunc} */
export const useAppDispatch = useDispatch

/** @type {import('react-redux').TypedUseSelectorHook<RootState>} */
export const useAppSelector = useSelector


export default store
