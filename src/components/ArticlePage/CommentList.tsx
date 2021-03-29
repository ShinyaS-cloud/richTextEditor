// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
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
import { Box } from '@material-ui/core'

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
  const stateComment = useSelector((state) => state.commentReducer.commentArray)
  const comment = stateComment.slice(1)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchComment(props.articleId))
  }, [dispatch, props.articleId])

  let commentRenderComponent

  if (comment.length === 0) {
    commentRenderComponent = <Typography>コメントはありません</Typography>
  } else {
    commentRenderComponent = comment.map((c) => {
      return (
        <div key={c.comment.id}>
          <ListItem alignItems="flex-start">
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
