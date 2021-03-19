// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import articleListReducer from './reducer/articleListReducer'
import articleReducer from './reducer/articleReducer'
import profileReducer from './reducer/profileReducer'

const reducer = {
  authReducer: authReducer.reducer,
  articleListReducer: articleListReducer.reducer,
  articleReducer: articleReducer.reducer,
  profileReducer: profileReducer.reducer
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
