import { forwardRef, useImperativeHandle, useState } from 'react'

/**
 * @typedef {Object} Props
 * @property {string} buttonLabel
 * */

/**
 * @typedef {Object} ImperativeObject
 * @property {() => void} toggleVisibility
 */

/**
 * @param {import('react').PropsWithChildren<Props>} props
 * @param {import('react').ForwardedRef<ImperativeObject>} refs
 * */
const Togglable = ({ children, buttonLabel }, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default forwardRef(Togglable)
