// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
// import { configureStore } from '@reduxjs/toolkit'

// const reducer = {

// }

// const store = configureStore({ reducer })

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    {/* <BrowserRouter></BrowserRouter> */}
    <App />
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
