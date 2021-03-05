// eslint-disable-next-line no-use-before-define
import React from 'react'
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core'
import { MenuOpen } from '@material-ui/icons'

import { Link } from 'react-router-dom'

interface Props {
  open: boolean
  openHandler: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<Props> = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0} className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={() => props.openHandler(!props.open)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuOpen />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button component={Link} to={'/login'}>
            Login
          </Button>
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
