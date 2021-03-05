// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import {
  Box,
  createStyles,
  fade,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInputProps,
  TextField,
  TextFieldProps,
  Theme
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'

interface State {
  name: string
  email: string
  password: string
  valiantPassword: string
}

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    valiantPassword: ''
  })
  const classes = useStylesReddit()
  const rootclasses = useStyle()

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const RedditTextField = (props: TextFieldProps) => {
    return (
      <TextField
        InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
        {...props}
      />
    )
  }

  return (
    <Box className={rootclasses.root}>
      <RedditTextField
        label="名前"
        variant="filled"
        id="reddit-name"
        placeholder="名前"
        value={values.name}
        onChange={handleChange('name')}
      />
      <RedditTextField
        label="e-mail"
        variant="filled"
        id="reddit-email"
        placeholder="e-mail"
        type="email"
        value={values.email}
        onChange={handleChange('email')}
      />
      <FormControl className={classes.root}>
        <InputLabel className={classes.password} htmlFor="standard-adornment-password">
          パスワード
        </InputLabel>
        <Input
          className={classes.password}
          id="standard-adornment-password"
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl className={classes.root}>
        <InputLabel className={classes.password} htmlFor="standard-adornment-password">
          確認用パスワード
        </InputLabel>
        <Input
          className={classes.password}
          id="standard-adornment-valiantpassword"
          type={showPassword ? 'text' : 'password'}
          value={values.valiantPassword}
          error={values.password !== values.valiantPassword}
          onChange={handleChange('valiantPassword')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  )
}
const useStylesReddit = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      width: '20rem',
      height: '4rem',
      '&:hover': {
        backgroundColor: '#fff'
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main
      }
    },
    focused: {},
    password: {
      paddingRight: '12px',
      paddingLeft: '12px'
    }
  })
)

const useStyle = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%'
  }
})

export default Signup
