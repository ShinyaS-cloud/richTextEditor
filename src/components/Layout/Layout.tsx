// eslint-disable-next-line no-use-before-define
import React from 'react'
import Navigation from '../Navigation/Navigation'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import Header from './Header'
import { Box, Toolbar } from '@material-ui/core'

type Props = { children: React.ReactNode }

const Layout: React.FC<Props> = (props) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Toolbar />
      <Box className={classes.mainContainer}>
        <Navigation />
        <main className={classes.mainPanel}>{props.children}</main>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      height: '100vh'
    },
    header: {
      zIndex: 10
    },
    mainContainer: {
      flexGrow: 1,
      display: 'flex',
      height: '100%',
      zIndex: 1
    },

    mainPanel: {
      flexGrow: 1,
      overflow: 'auto',
      backgroundColor: '#f2ecd8'
    }
  })
)

export default Layout
