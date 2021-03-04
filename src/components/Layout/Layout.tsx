// eslint-disable-next-line no-use-before-define
import React from 'react'
import Navigation from '../Navigation/Navigation'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Header from './Header'
import { Box } from '@material-ui/core'

type Props = { children: React.ReactNode }

const Layout: React.FC<Props> = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Header />
      <Navigation />
      <Box className={classes.mainPanel}>{props.children}</Box>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100vh'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  mainPanel: {
    flex: '1 1 0',
    overflowY: 'scroll',
    height: '100vh'
  }
}))

export default Layout
