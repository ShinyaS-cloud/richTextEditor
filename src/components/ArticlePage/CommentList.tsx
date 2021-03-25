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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper
    },
    inline: {
      display: 'inline'
    }
  })
)

const CommentList = () => {
  const classes = useStyles()
  const comment = useSelector((state) => state.commentReducer.comment)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchComment())
  }, [dispatch])

  const commentRenderComponent = comment.map((c) => {
    return (
      <div key={c.id}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={c.user.codename} src={c.user.avatarUrl} />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
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
                {c.comment}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    )
  })

  return <List className={classes.root}>{commentRenderComponent}</List>
}

export default CommentList
