// eslint-disable-next-line no-use-before-define
import React, { Fragment } from 'react'
import { AppBar, Avatar, Button, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const classes = useStyles()
  const authUser = useSelector((state) => state.authReducer)
  const renderContent = () => {
    if (authUser.isLoggedIn) {
      return (
        <Fragment>
          <a href={'/' + authUser.codename}>
            <Avatar aria-label="recipe" src={process.env.PUBLIC_URL + '/' + authUser.avatarUrl} />
          </a>
          <Button
            className={classes.loginButton}
            href={process.env.REACT_APP_API_BASE_URL + '/api/logout'}
          >
            ログアウト
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          {/* <Button className={classes.loginButton} component={Link} to="/signup">
            サインイン
          </Button> */}
          <Button className={classes.loginButton} component={Link} to={'/signup'}>
            サインイン
          </Button>
          <Button className={classes.loginButton} component={Link} to={'/login'}>
            ログイン
          </Button>
        </Fragment>
      )
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <a href="/home" className={classes.titleDecoration}>
              Rich Text Editor
            </a>
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
    color: 'white'
  },
  loginButton: {
    color: 'white'
  }
}))
export default Header
