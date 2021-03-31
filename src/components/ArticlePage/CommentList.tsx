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
import { Box, Button, Collapse, TextField } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '60%',
      minHeight: theme.spacing(50),
      backgroundColor: theme.palette.background.paper
    },
    inline: {
      display: 'inline'
    },
    title: { padding: theme.spacing(2) }
  })
)

type Props = {
  articleId: number
}

const CommentList: React.FC<Props> = (props) => {
  const classes = useStyles()
  const auth = useSelector((state) => state.authReducer)
  const stateComment = useSelector((state) => state.commentReducer.commentArray)
  const comment = stateComment.slice(1)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchComment(props.articleId))
  }, [dispatch, props.articleId])

  const [expanded, setExpanded] = useState(false)

  const editHandler = async (comment: any) => {
    try {
      setExpanded(true)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteHandler = async (comment: any) => {
    try {
      await axios.delete('/api/comment/delete', {
        params: { commentId: comment.comment.id }
      })
    } catch (error) {
      console.log(error)
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
          <Button onClick={() => editHandler(props.comment)} variant="contained" color="primary">
            編集
          </Button>
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
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <TextField
                id="filled-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="filled"
              />
            </Collapse>
          </ListItem>
          <Divider />
        </div>
      )
    })
  }

  return (
    <Box className={classes.root}>
      <Typography component="h5" variant="h5" className={classes.title} color="textPrimary">
        コメント
      </Typography>
      <Divider />
      <List>{commentRenderComponent}</List>
    </Box>
  )
}

export default CommentList
