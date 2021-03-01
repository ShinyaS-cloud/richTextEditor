// eslint-disable-next-line no-use-before-define
import React from 'react'
import { CssBaseline } from '@material-ui/core'

import Layout from './components/Layout/Layout'

const App: React.FC = () => {
  return (
    <div>
      <CssBaseline/>
      <Layout />
    </div>
  )
}

export default App
