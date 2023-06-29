import clsx from 'clsx'
import { forwardRef, useImperativeHandle, useState } from 'react'

/**
 * @typedef {Object} Props
 * @property {string} buttonLabel
 * @property {boolean} [hiddenCancel]
 * */

/**
  * @typedef {{ toggleVisibility: (forceState: boolean) => void}} ImperativeObject
  */

/**
 * @param {import('react').PropsWithChildren<Props>} props
 * @param {import('react').ForwardedRef<ImperativeObject>} refs
 * */
const Togglable = ({ children, buttonLabel, hiddenCancel = false }, refs) => {
  const [visible, setVisible] = useState(false)

  /**
   * @param {boolean} [forceState]
   */
  const toggleVisibility = (forceState) => {
    setVisible(forceState ?? !visible)
  }

  function initImperative() {
    return {
      toggleVisibility
    }
  }


  useImperativeHandle(refs, initImperative)

  return (
    <>
      <section className={clsx({ ['hidden']: visible })}>
        <button className='btn btn-outline btn-primary' onClick={() => toggleVisibility()}>{buttonLabel}</button>
      </section>
      <section className={clsx({ ['hidden']: !visible })}>
        {children}
        {!hiddenCancel && <button className='btn btn-outline btn-secondary mt-2' onClick={() => toggleVisibility()}>cancel</button>}
      </section>
    </>
  )
}

export default forwardRef(Togglable)
