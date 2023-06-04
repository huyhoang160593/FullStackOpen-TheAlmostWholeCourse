import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer, { BASE_ACTION } from './reducer'

const store = createStore(reducer)

const App = () => {
  const actionChange = (action) => {
    store.dispatch({
      type: action
    })
  }

  return (
    <div>
      <button onClick={() => actionChange(BASE_ACTION.GOOD)}>good</button>
      <button onClick={() => actionChange(BASE_ACTION.OK)}>ok</button>
      <button onClick={() => actionChange(BASE_ACTION.BAD)}>bad</button>
      <button onClick={() => actionChange(BASE_ACTION.ZERO)}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
