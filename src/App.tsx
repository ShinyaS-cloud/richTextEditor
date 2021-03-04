// eslint-disable-next-line no-use-before-define
import React from 'react'
import { CssBaseline } from '@material-ui/core'

import Layout from './components/Layout/Layout'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import RichEditor from './components/RichEditor/RichEditor'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route path="/" exact component={RichEditor} />
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  )
}

export default App
