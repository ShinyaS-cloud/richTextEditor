// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import { CssBaseline } from '@material-ui/core'

import Layout from './components/Layout/Layout'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import RichEditor from './components/RichEditor/RichEditor'
import Signup from './components/Login/Signup'
import Posts from './components/PostPage/Posts'
import Login from './components/Login/Login'
import { fetchUser } from './reducer/authReducer'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.authReducer)

  console.log(state)

  useEffect(() => {
    dispatch(fetchUser())
    const getCsrfToken = async () => {
      const { data } = await axios.get('/api/csrfToken')
      axios.defaults.headers.post['X-CSRF-Token'] = data.csrfToken
    }
    getCsrfToken()
  }, [])

  return (
    <BrowserRouter>
      <div>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/newpost/:articleId" component={RichEditor} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  )
}

export default App
