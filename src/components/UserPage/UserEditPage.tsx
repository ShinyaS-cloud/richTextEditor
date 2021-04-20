// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core'
import { useSelector } from 'react-redux'

import { useHistory, useLocation } from 'react-router'
import { Alert } from '@material-ui/lab'

import axios from 'axios'

const UserEditPage = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.userReducer)
  const history = useHistory()
  const location = useLocation()

  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '', name: '', introduction: '' })

  const postForm = async () => {
    const url = location.pathname === 'signup' ? 'signup' : 'userEdit'
    try {
      const { data } = await axios.post('/api/' + url, formData)
      if (data) {
        history.push('/' + data.codename)
      } else {
        setOpen(true)
      }
    } catch (error) {
      console.log('postForm', error.message)
    }
  }

  /**
   * snackbar
   */

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const emailChangeHandler = (e: any) => {
    setFormData({ ...formData, email: e.target.value })
  }
  const passwordChangeHandler = (e: any) => {
    setFormData({ ...formData, password: e.target.value })
  }
  const introductionChangeHandler = (e: any) => {
    setFormData({ ...formData, introduction: e.target.value })
  }
  const nameChangeHandler = (e: any) => {
    setFormData({ ...formData, name: e.target.value })
  }

  const Title = () => {
    if (location.pathname === '/signup') {
      return (
        <Typography component="h1" variant="h5">
          サインイン
        </Typography>
      )
    } else {
      return (
        <Typography component="h1" variant="h5">
          編集
        </Typography>
      )
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.card}>
        <Container component="main" maxWidth="xs">
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              メールアドレスかパスワードが間違っています
            </Alert>
          </Snackbar>
          <div className={classes.paper}>
            <Avatar
              className={classes.avatar}
              src={process.env.PUBLIC_URL + '/' + user.avatarUrl}
            />
            <Title />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  type="name"
                  name="name"
                  value={formData.name}
                  onChange={nameChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="introduction"
                  label="introduction"
                  type="introduction"
                  name="introduction"
                  value={formData.introduction}
                  onChange={introductionChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={emailChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={passwordChangeHandler}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={postForm}
              className={classes.submit}
            >
              送信
            </Button>
          </div>
        </Container>
      </Paper>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    margin: '0 auto',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '95%'
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      width: '80%'
    }
  },
  card: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  appBar: {
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#bf0426'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default UserEditPage
