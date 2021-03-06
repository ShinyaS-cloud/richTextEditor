// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import { CssBaseline } from '@material-ui/core'

import Layout from './components/Layout/Layout'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import RichEditor from './components/RichEditor/RichEditor'
import Signup from './components/Signup'
import Posts from './components/Posts'
import Login from './components/Login'
import { fetchUser } from './reducer/authReducer'
import { useDispatch } from 'react-redux'

const dispatch = useDispatch()

useEffect(() => {
  dispatch(fetchUser())
})

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route path="/" exact component={RichEditor} />
            <Route path="/posts" component={Posts} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  )
}

export default App
