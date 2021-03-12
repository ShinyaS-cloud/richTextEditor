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
import { Menu } from '@material-ui/icons'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

interface Props {
  open: boolean
  openHandler: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<Props> = (props) => {
  const classes = useStyles()
  const auth = useSelector((state) => state.authReducer)
  const renderContent = () => {
    if (auth.googleId === '') {
      return (
        <Button className={classes.loginButton} component={Link} to={'/login'}>
          ログイン
        </Button>
      )
    } else {
      return (
        <Button className={classes.loginButton} href={'/api/logout'}>
          ログアウト
        </Button>
      )
    }
  }

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
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to={'/'} className={classes.titleDecoration}>
              Rich Text Editor
            </Link>
          </Typography>
          {renderContent()}
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
  },
  titleDecoration: {
    textDecoration: 'none',
    color: 'black'
  },
  loginButton: {
    color: 'white'
  }
}))
export default Header
