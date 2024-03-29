// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/authReducer'
import articleListReducer from './reducer/articleListReducer'
import userReducer from './reducer/userReducer'
import followReducer from './reducer/followReducer'
import commentReducer from './reducer/commentReducer'

const reducer = {
  authReducer: authReducer.reducer,
  articleListReducer: articleListReducer.reducer,
  userReducer: userReducer.reducer,
  followReducer: followReducer.reducer,
  commentReducer: commentReducer.reducer
}

const store = configureStore({ reducer })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
