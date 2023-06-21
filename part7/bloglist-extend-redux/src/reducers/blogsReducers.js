import { createSlice } from '@reduxjs/toolkit'
import blogServices from 'services/blogs'

const initialState = /** @type {Blog[]} */ ([])

const blogsReducer = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    /** @param {{payload: Blog | Blog[]}} action  */
    appendBlogs(state, action) {
      return state.concat(action.payload)
    },
  },
})

const { appendBlogs } = blogsReducer.actions

/** All Thunk Action */

/**
 * @returns {import("@reduxjs/toolkit").ThunkAction<void, import('store.js').RootState, unknown, import('@reduxjs/toolkit').AnyAction>}
 */
export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogServices.getAll()
      dispatch(appendBlogs(blogs))
    } catch (error) {
      return error
    }
  }
}

/**
 * @param {Pick<Blog, 'author' | 'title' | 'url'>} blogObject
 * @param {User} user
 * @returns {import("@reduxjs/toolkit").ThunkAction<void, import('store.js').RootState, unknown, import('@reduxjs/toolkit').AnyAction>}
 */
export const addBlog = (blogObject, user) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogServices.create(blogObject)
      const injectUser = {
        id: newBlog.user,
        name: user.name,
        username: user.username,
      }
      newBlog.user = injectUser
      dispatch(appendBlogs(newBlog))
    } catch (error) {
      return error
    }
  }
}

export default blogsReducer.reducer
