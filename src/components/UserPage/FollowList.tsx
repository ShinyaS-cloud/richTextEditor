// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { fetchFollow, fetchFollowee } from '../../reducer/followReducer'
import { Avatar, Box, makeStyles, Paper, Typography } from '@material-ui/core'

type Props = {
  type: 'to' | 'from'
}

const FollowList: React.FC<Props> = (props) => {
  const classes = useStyles()

  const user = useSelector((state) => state.userReducer)

  const follow = useSelector((state) => state.followReducer)
  const toFollow = follow.toFollow
  const fromFollow = follow.fromFollow

  const dispatch = useDispatch()

  useEffect(() => {
    if (props.type === 'to') {
      dispatch(fetchFollow(user.id))
    } else {
      dispatch(fetchFollowee(user.id))
    }
  }, [dispatch, props.type, user.id])

  const userBox = (a: any) => {
    return (
      <Paper key={a.name} className={classes.content}>
        <Avatar className={classes.avatar} src={process.env.PUBLIC_URL + '/' + a.avatarUrl} />
        <Box>
          <Typography variant="h5" component="h5">
            {a.name}
          </Typography>
          <Typography className={classes.codename} variant="inherit" component="h5">
            @{a.codename}
          </Typography>
        </Box>
      </Paper>
    )
  }

  const toFollowRenderMap = toFollow.map(userBox)
  const fromFollowRenderMap = fromFollow.map(userBox)
  const renderMap = props.type === 'to' ? toFollowRenderMap : fromFollowRenderMap

  return <Box>{renderMap}</Box>
}

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    width: '100%'
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },

  codename: {
    color: theme.palette.grey[100]
  }
}))

export default FollowList
