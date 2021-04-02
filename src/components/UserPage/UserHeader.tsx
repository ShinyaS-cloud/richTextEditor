// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  CardContent,
  CardMedia,
  makeStyles,
  Typography
} from '@material-ui/core'
import { useSelector } from 'react-redux'

import qs from 'qs'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const UserHeader = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.userReducer)

  const [followState, setFollowState] = useState(false)
  const [followeeCount, setFolloweeCount] = useState(0)

  const history = useHistory()
  useEffect(() => {
    setFollowState(user.isFollow)
    setFolloweeCount(user.followeeCount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isFollow, user.followeeCount])

  const toggleFollowHandler = async () => {
    try {
      const { data } = await axios.post('/api/follow', qs.stringify({ toUserId: user.id }))
      if (data.authorizationRequired) {
        history.push('/login')
      } else {
        setFollowState(data.isFollow)
        setFolloweeCount(data.followeeCount)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const followButtonOption = followState ? 'フォロー解除' : 'フォロー'
  const followButtonClass = followState ? classes.followButtonOff : classes.followButtonOn

  return (
    <Box>
      <CardMedia component="img" height="300" src={user.headerUrl} />
      <CardContent className={classes.cardContent}>
        <Avatar className={classes.avatar} src={process.env.PUBLIC_URL + '/' + user.avatarUrl} />
        <Box>
          <Typography variant="h5" component="h3">
            {user.name}
          </Typography>
          <Typography className={classes.codename} variant="inherit" component="h3">
            @{user.codename}
          </Typography>
        </Box>
        <Button className={followButtonClass} variant="contained" onClick={toggleFollowHandler}>
          {followButtonOption}
        </Button>
        <Typography className={classes.follower} variant="inherit" component="h3">
          {'フォローしているユーザー：' + user.followerCount}
        </Typography>
        <Typography className={classes.follower} variant="inherit" component="h3">
          {'フォローされているユーザー：' + followeeCount}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography color="textSecondary" component="p">
          {user.introduction}
        </Typography>
      </CardContent>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    top: -theme.spacing(9)
  },
  cardContent: {
    display: 'flex',
    maxHeight: theme.spacing(13)
  },
  codename: {
    color: 'gray'
  },
  follower: {
    color: 'gray',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  followButtonOn: {
    top: theme.spacing(1),
    height: theme.spacing(5),
    marginLeft: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main
  },
  followButtonOff: {
    top: theme.spacing(1),
    height: theme.spacing(5),
    marginLeft: theme.spacing(3),
    backgroundColor: theme.palette.grey[100]
  }
}))

export default UserHeader
