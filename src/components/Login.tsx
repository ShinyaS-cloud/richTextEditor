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
import { Link } from 'react-router-dom'

import normalGoogleButton from '../assets/btn_google_signin_light_normal_web.png'
import pressGoogleButton from '../assets/btn_google_signin_light_pressed_web.png'
import { Divider } from '@material-ui/core'

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a href="/">Your Website</a> {new Date().getFullYear()}
      {'.'}
    </Typography>
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

const SignIn = () => {
  const classes = useStyles()
  const [image, setImage] = useState(normalGoogleButton)

  const onMouseDownHandler = () => {
    setImage(pressGoogleButton)
  }
  const onMouseUpHandler = () => {
    setImage(normalGoogleButton)
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Divider className={classes.divider} />
        <a href="/auth/google">
          <img
            src={image}
            alt="googleLoginButton"
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
          />
        </a>
        <Divider className={classes.divider} />
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          <Grid container>
            <Grid item xs>
              <a href="#">Forgot password?</a>
            </Grid>
            <Grid item>
              <Link to={'/signup'}>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default SignIn
