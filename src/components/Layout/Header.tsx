// eslint-disable-next-line no-use-before-define
import React from 'react'
import {
  AppBar,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core'
import { MenuOpen } from '@material-ui/icons'
import LoginModal from '../LoginModal'

const Header: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0} className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuOpen />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <LoginModal />
        </Toolbar>
      </AppBar>
    </div>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: '#bf0426'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))
export default Header
