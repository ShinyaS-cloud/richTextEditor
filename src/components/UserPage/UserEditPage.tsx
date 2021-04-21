// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  Container,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core'
import { useSelector } from 'react-redux'

import { useLocation } from 'react-router'
import { Alert } from '@material-ui/lab'

import axios from 'axios'

const UserEditPage = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.userReducer)

  const pathLocation = useLocation()

  const [open, setOpen] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [openValid, setOpenValid] = useState(false)
  const [formData, setFormData] = useState({
    codename: '',
    email: '',
    password: '',
    name: '',
    introduction: ''
  })

  const fetchUserInfo = async () => {
    const { data } = await axios.get('/api/userEdit')
    setFormData({ ...data })
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const postFormSignup = async () => {
    if (formData.codename.length && formData.email.length && formData.password.length) {
      try {
        const { data } = await axios.post('/api/signup', formData)
        if (data.error) {
          setOpenLogin(true)
        } else if (data && !data.error) {
          await axios.post('/api/login', {
            email: formData.email,
            password: formData.password
          })
          location.href = '/' + data.codename
        } else {
          setOpen(true)
        }
      } catch (error) {
        console.log('postForm', error.message)
      }
    } else {
      setOpenValid(true)
    }
  }

  const postForm = async () => {
    if (formData.codename.length && formData.email.length && formData.password.length) {
      try {
        const { data } = await axios.post('/api/userEdit', formData)
        if (data) {
          location.href = '/' + data.codename
        } else {
          setOpen(true)
        }
      } catch (error) {
        console.log('postForm', error.message)
      }
    } else {
      setOpenValid(true)
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
    setOpenLogin(false)
    setOpenValid(false)
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
  const codenameChangeHandler = (e: any) => {
    setFormData({ ...formData, codename: e.target.value })
  }

  const Title = () => {
    if (pathLocation.pathname === '/signup') {
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

  const SubmitButton = () => {
    if (pathLocation.pathname === '/signup') {
      return (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={postFormSignup}
          className={classes.submit}
        >
          送信
        </Button>
      )
    } else {
      return (
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
      )
    }
  }

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            メールアドレスかパスワードが間違っています
          </Alert>
        </Snackbar>
        <Snackbar open={openLogin} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            すでにサインインしています
          </Alert>
        </Snackbar>
        <Snackbar open={openValid} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            すべての項目を記入してください
          </Alert>
        </Snackbar>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={process.env.PUBLIC_URL + '/' + user.avatarUrl} />
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
                id="codename"
                label="codename"
                type="codename"
                name="codename"
                value={formData.codename}
                onChange={codenameChangeHandler}
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
          <SubmitButton />
        </div>
      </Container>
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
