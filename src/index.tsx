// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { configureStore } from '@reduxjs/toolkit'
import buttonReducer from './store/buttonReducer'

const reducer = {
  buttonReducer: buttonReducer.reducer
}

const store = configureStore({ reducer })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
