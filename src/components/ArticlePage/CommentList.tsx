// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComment } from '../../reducer/commentReducer'
import { Box, Button, Snackbar, TextField } from '@material-ui/core'
import axios from 'axios'
import { useHistory } from 'react-router'

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

type Props = {
  articleId: number
}

const CommentList: React.FC<Props> = (props) => {
  const classes = useStyles()
  const auth = useSelector((state) => state.authReducer)
  const stateComment = useSelector((state) => state.commentReducer.commentArray)
  const comment = stateComment.slice(1)
  const [open, setOpen] = useState(false)
  const [alertNumber, setAlertNumber] = useState(0)
  const [commentValue, setCommentValue] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchComment(props.articleId))
  }, [dispatch, props.articleId])

  const deleteHandler = async (comment: any) => {
    try {
      const { data } = await axios.delete('/api/comment/delete', {
        data: { commentId: comment.comment.id }
      })
      if (data.authorizationRequired) {
        return history.push('/home')
      }

      dispatch(fetchComment(props.articleId))
    } catch (error) {
      console.log(error)
    }
  }

  const postForm = async () => {
    try {
      const formData = { comment: commentValue, articleId: props.articleId }
      if (commentValue === '') {
        setAlertNumber(2)
        setOpen(true)
        return
      }
      const { data } = await axios.post('/api/comment', formData)
      if (data.success) {
        setAlertNumber(1)
        setOpen(true)
        setCommentValue('')
        dispatch(fetchComment(props.articleId))
      } else {
        setAlertNumber(0)
        setOpen(true)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const commentChangeHandler = (e: any) => {
    setCommentValue(e.target.value)
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

  const AlertComponent = () => {
    switch (alertNumber) {
      case 0:
        return (
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              投稿できませんでした
            </Alert>
          </Snackbar>
        )
      case 1:
        return (
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              投稿しました
            </Alert>
          </Snackbar>
        )
      case 2:
        return (
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              コメントを記入してください
            </Alert>
          </Snackbar>
        )

      default:
        return (
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              コメントを記入してください
            </Alert>
          </Snackbar>
        )
    }
  }

  type editProps = {
    comment: {
      comment: {
        id: number
        comment: string
      }
      user: {
        name: string
        codename: string
        avatarUrl: string
      }
    }
  }
  const EditButton: React.FC<editProps> = (props) => {
    if (auth.codename === props.comment.user.codename) {
      return (
        <div>
          <Button onClick={() => deleteHandler(props.comment)} variant="contained" color="primary">
            削除
          </Button>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  let commentRenderComponent

  if (comment.length === 0) {
    commentRenderComponent = <Typography>コメントはありません</Typography>
  } else {
    commentRenderComponent = comment.map((c) => {
      return (
        <div key={c.comment.id}>
          <ListItem alignItems="center">
            <ListItemAvatar>
              <a href={'/' + c.user.codename}>
                <Avatar aria-label="recipe" src={process.env.PUBLIC_URL + '/' + c.user.avatarUrl} />
              </a>
            </ListItemAvatar>
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {c.user.name}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {c.comment.comment}
                  </Typography>
                </React.Fragment>
              }
            />
            <EditButton comment={c} />
          </ListItem>
          <Divider />
        </div>
      )
    })
  }

  return (
    <Box className={classes.root}>
      <AlertComponent />

      <Typography component="h5" variant="h5" className={classes.title} color="textPrimary">
        コメント
      </Typography>
      <Divider />
      <List>{commentRenderComponent}</List>
      <TextField
        className={classes.text}
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
        required
        value={commentValue}
        onChange={commentChangeHandler}
        fullWidth
        id="text"
        name="comment"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={postForm}
        className={classes.submit}
      >
        投稿
      </Button>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '60%',
      minHeight: theme.spacing(50),
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.between('xs', 'sm')]: {
        width: '95%'
      },
      [theme.breakpoints.between('sm', 'lg')]: {
        width: '80%'
      }
    },
    inline: {
      display: 'inline'
    },
    title: { padding: theme.spacing(2) },
    textField: {
      width: '100%'
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    text: {
      height: theme.spacing(10)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  })
)

export default CommentList
