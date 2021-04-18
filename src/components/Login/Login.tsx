// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { useForm } from 'react-hook-form'

import { Link } from 'react-router-dom'

import normalGoogleButton from '../../assets/btn_google_signin_light_normal_web.png'
import pressGoogleButton from '../../assets/btn_google_signin_light_pressed_web.png'
import { Divider, Snackbar } from '@material-ui/core'
import axios from 'axios'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a href="/">RichTextEditor</a> {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const LogIn = () => {
  const classes = useStyles()
  const [image, setImage] = useState(normalGoogleButton)
  const [open, setOpen] = useState(false)
  const { handleSubmit, register, errors } = useForm()

  const onMouseDownHandler = () => {
    setImage(pressGoogleButton)
  }
  const onMouseUpHandler = () => {
    setImage(normalGoogleButton)
  }

  /**
   * login→できなければスナックバーを出す
   */

  const postForm = async (formData: any) => {
    try {
      const { data } = await axios.post('/api/login', formData)
      if (data) {
        location.href = '/home'
      } else {
        setOpen(true)
      }
    } catch (error) {
      console.log(error.message)
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

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  /**
   * render
   */

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          メールアドレスかパスワードが間違っています
        </Alert>
      </Snackbar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Divider className={classes.divider} />
        <a href={process.env.REACT_APP_API_BASE_URL + '/auth/google'}>
          <img
            src={image}
            alt="googleLoginButton"
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
          />
        </a>
        <Divider className={classes.divider} />

        <form onSubmit={handleSubmit((data) => postForm(data))} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            inputRef={register({
              required: 'required!'
            })}
            error={Boolean(errors.example1)}
            helperText={errors.example1 && errors.example1.message}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({
              required: 'required!'
            })}
            error={Boolean(errors.example1)}
            helperText={errors.example1 && errors.example1.message}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <a href="#">Forgot password?</a>
          </Grid>
          <Grid item>
            <Link to={'/signup'}>{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  divider: {
    width: '30rem',
    marginTop: '1rem',
    marginBottom: '1rem'
  }
}))

export default LogIn
