// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import Navigation from '../Navigation/Navigation'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import Header from './Header'
import { Box } from '@material-ui/core'

type Props = { children: React.ReactNode }

const Layout: React.FC<Props> = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header open={open} openHandler={setOpen} />
      </Box>
      <Box className={classes.mainContainer}>
        <Navigation open={open} openHandler={setOpen} />
        <main className={classes.mainPanel}>{props.children}</main>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '100%'
    },
    header: {
      zIndex: 100
    },
    mainContainer: {
      flexGrow: 1,
      display: 'flex',
      height: '100%',
      zIndex: 1
    },

    mainPanel: {
      flexGrow: 1,
      overflow: 'auto'
    }
  })
)

export default Layout
