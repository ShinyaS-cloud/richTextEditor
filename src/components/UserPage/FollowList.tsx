// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import followReducer, { fetchFollower, fetchFollowee } from '../../reducer/followReducer'
import { Avatar, Box, makeStyles, Paper, Typography } from '@material-ui/core'

type Props = {
  type: boolean
}

const FollowList: React.FC<Props> = (props) => {
  const classes = useStyles()

  const user = useSelector((state) => state.userReducer)

  const follow = useSelector((state) => state.followReducer)
  const follower = follow.follower.slice(1)
  const followee = follow.followee.slice(1)

  const dispatch = useDispatch()

  useEffect(() => {
    if (props.type) {
      dispatch(fetchFollower(user.id))
    } else {
      dispatch(fetchFollowee(user.id))
    }
    return () => {
      dispatch(followReducer.actions.followInit())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const userBox = (a: any) => {
    return (
      <Paper key={a.codename} className={classes.content}>
        <a href={'/' + a.codename}>
          <Avatar aria-label="recipe" src={process.env.PUBLIC_URL + '/' + a.avatarUrl} />
        </a>
        <Box>
          <Typography variant="h5" component="h5">
            {a.name}
          </Typography>
          <Typography className={classes.codename} component="h5">
            @{a.codename}
          </Typography>
        </Box>
        <Box>
          <Typography className={classes.codename} component="h5">
            {a.introduction}
          </Typography>
        </Box>
      </Paper>
    )
  }

  const followerRenderMap = follower.map((f) => userBox(f))
  const followeeRenderMap = followee.map((f) => userBox(f))
  const renderMap = props.type ? followerRenderMap : followeeRenderMap

  return <Box>{renderMap}</Box>
}

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    width: '100%',
    height: theme.spacing(10)
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },

  codename: {}
}))

export default FollowList
