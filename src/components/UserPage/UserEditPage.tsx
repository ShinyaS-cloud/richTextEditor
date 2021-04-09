// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import userReducer, { fetchProfile } from '../../reducer/userReducer'
import { useHistory, useParams } from 'react-router'
import { Alert } from '@material-ui/lab'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Link } from 'react-router-dom'

type Params = { codename: string }

const UserEditPage = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.userReducer)
  const history = useHistory()

  const { handleSubmit } = useForm()
  const [open, setOpen] = useState(false)
  const postForm = async (formData: any) => {
    try {
      const { data } = await axios.post('/api/userEdit', formData)
      if (data) {
        history.push('/' + user.codename)
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
  const param = useParams<Params>()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProfile(param.codename))
    return () => {
      dispatch(userReducer.actions.userInit())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

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
            <Typography component="h1" variant="h5">
              編集
            </Typography>
            <form onSubmit={handleSubmit((data) => postForm(data))} className={classes.form}>
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
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to={'/login'}>Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </form>
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
