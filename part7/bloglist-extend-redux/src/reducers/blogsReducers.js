import { createSlice } from '@reduxjs/toolkit'
import blogServices from 'services/blogs'
import { SUCCESS, setNotification } from './notificationReducer'

const initialState = /** @type {Blog[]} */ ([])

const blogsReducer = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    /** @param {{payload: Blog[], type: string}} action  */
    initBlogs(_state, action) {
      return action.payload
    },
    /** @param {{payload: Blog | Blog[], type: string}} action  */
    appendBlogs(state, action) {
      return state.concat(action.payload)
    },
    /** @param {{payload: Blog, type: string}} action  */
    updateBlog(state, action) {
      return state.map((blog) =>
        action.payload.id === blog.id ? action.payload : blog
      )
    },
    /** @param {{payload: string, type: string}} action  */
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

const { initBlogs, appendBlogs, updateBlog, deleteBlog } = blogsReducer.actions

/** All Thunk Actions */

/**
 * @returns {import("@reduxjs/toolkit").ThunkAction<Promise<void | any>, import('store.js').RootState, unknown, import('@reduxjs/toolkit').AnyAction>}
 */
export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogServices.getAll()
      dispatch(initBlogs(blogs))
    } catch (error) {
      return error
    }
  }
}

/**
 * @param {Pick<Blog, 'author' | 'title' | 'url'>} blogObject
 * @returns {import("@reduxjs/toolkit").ThunkAction<Promise<void | any>, import('store.js').RootState, unknown, import('@reduxjs/toolkit').AnyAction>}
 */
export const addBlog = (blogObject) => {
  return async (dispatch, getState) => {
    try {
      const user = getState().user
      const newBlog = await blogServices.create(blogObject)
      const injectUser = {
        id: newBlog.user,
        name: user.name,
        username: user.username,
      }
      newBlog.user = injectUser
      dispatch(appendBlogs(newBlog))
      dispatch(
        setNotification({
          message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          type: SUCCESS,
        })
      )
    } catch (error) {
      return error
    }
  }
}

/**
 * @param {string} blogId
 * @param {Pick<Blog, 'author' | 'title' | 'url' | 'likes'>} blogObject
 * @returns {import("@reduxjs/toolkit").ThunkAction<Promise<void | any>, import('store.js').RootState, unknown, import('@reduxjs/toolkit').AnyAction>}
 */
export const changeBlog = (blogId, blogObject) => {
  return async (dispatch, getState) => {
    try {
      const user = getState().user
      const updatedBlog = await blogServices.put(blogId, blogObject)
      const injectUser = {
        id: updatedBlog.user,
        name: user.name,
        username: user.username,
      }
      updatedBlog.user = injectUser
      dispatch(updateBlog(updatedBlog))
    } catch (error) {
      return error
    }
  }
}

/**
 * @param {string} blogId
 * @returns {import("@reduxjs/toolkit").ThunkAction<Promise<void | any>, import('store.js').RootState, unknown, import('@reduxjs/toolkit').AnyAction>}
 */
export const removeBlog = (blogId) => {
  return async (dispatch) => {
    try {
      await blogServices.deleteItem(blogId)
      dispatch(deleteBlog(blogId))
    } catch (error) {
      return error
    }
  }
}

export default blogsReducer.reducer
