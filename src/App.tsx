// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core'

import Layout from './components/Layout/Layout'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import RichEditor from './components/RichEditor/RichEditor'

import Signup from './components/Login/Signup'

import Login from './components/Login/Login'
import { fetchUser } from './reducer/authReducer'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import ArticlePage from './components/ArticlePage/ArticlePage'
import UserPage from './components/UserPage/UserPage'
import ArticleListComponent from './components/UtilComponent/ArticleListComponent'
import UserEditPage from './components/UserPage/UserEditPage'

const App: React.FC = () => {
  axios.defaults.withCredentials = true
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.authReducer)
  const user = useSelector((state) => state.userReducer)

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const { data } = await axios.get('/api/csrfToken')
        axios.defaults.headers.common['X-CSRF-Token'] = data.csrfToken
      } catch (error) {
        console.log(error)
      }
    }
    getCsrfToken()
    dispatch(fetchUser())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const theme = createMuiTheme({
    palette: {
      background: {
        default: '#f2ecd8'
      }
    }
  })

  const validationHandler = (transition: any) => {
    if (auth.id !== user.id) {
      transition.redirect('/')
    }
  }

  const isLoginHandler = (transition: any) => {
    if (auth.id !== 0) {
      transition.redirect('/')
    }
  }

  return (
    <BrowserRouter>
      <div>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" exact render={() => <ArticleListComponent type="category" />} />
              <Route path="/signup" exact component={Signup} onEnter={isLoginHandler} />
              <Route path="/login" exact component={Login} onEnter={isLoginHandler} />
              <Route
                path="/edit/:codename/:articleId"
                component={RichEditor}
                onEnter={validationHandler}
              />
              <Route path="/edit/:codename/" component={UserEditPage} onEnter={validationHandler} />
              <Route path="/:codename/:articleId" component={ArticlePage} />
              <Route path="/:codename" exact component={UserPage} />
            </Switch>
          </Layout>
        </MuiThemeProvider>
      </div>
    </BrowserRouter>
  )
}

export default App
