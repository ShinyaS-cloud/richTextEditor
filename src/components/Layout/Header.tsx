// eslint-disable-next-line no-use-before-define
import React from 'react'
import { AppBar, Button, IconButton, makeStyles, Theme, Typography } from '@material-ui/core'
import { MenuOpen } from '@material-ui/icons'

const Header:React.FC = () => {
  const classes = useStyles()
  return (
    <AppBar position="fixed">
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuOpen />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </AppBar>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))
export default Header
