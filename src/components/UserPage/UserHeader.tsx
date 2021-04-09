// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  CardContent,
  CardMedia,
  makeStyles,
  Snackbar,
  Typography
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import qs from 'qs'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import authReducer from '../../reducer/authReducer'

const UserHeader = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.userReducer)
  const auth = useSelector((state) => state.authReducer)
  const dispatch = useDispatch()

  const [followState, setFollowState] = useState(false)
  const [followeeCount, setFolloweeCount] = useState(0)
  const [snackOpen, setSnackOpen] = useState(false)

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

  const editHandler = async () => {
    try {
      history.push('/edit/' + user.codename)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteHandler = async () => {
    try {
      const { data } = await axios.delete('/api/user/delete')
      if (data.authorizationRequired) {
        setSnackOpen(true)
        return
      } else {
        dispatch(authReducer.actions.userInit)
        history.push('/home')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const newArticleHandler = async () => {
    try {
      const { data } = await axios.post('/api/newpost')
      if (data.authorizationRequired) {
        history.push('/login')
      } else {
        const { articleId, codename } = data
        history.push('/edit/' + codename + '/' + articleId)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const EditButton: React.FC = () => {
    if (auth.id === user.id) {
      return (
        <div>
          <Button onClick={newArticleHandler} variant="contained" color="primary">
            新規記事作成
          </Button>
          <Button onClick={editHandler} variant="contained" color="primary">
            ユーザー編集
          </Button>
          <Button onClick={deleteHandler} variant="contained" color="primary">
            ユーザー削除
          </Button>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackOpen(false)
  }

  const followButtonOption = followState ? 'フォロー解除' : 'フォロー'
  const followButtonClass = followState ? classes.followButtonOff : classes.followButtonOn

  return (
    <Box>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          不正な操作です
        </Alert>
      </Snackbar>
      <CardMedia className={classes.header} component="img" height="300" src={user.headerUrl} />
      <CardContent className={classes.cardContent}>
        <Box className={classes.nameAvatarComponent}>
          <Avatar className={classes.avatar} src={process.env.PUBLIC_URL + '/' + user.avatarUrl} />
          <Box>
            <Typography className={classes.name} variant="h5" component="h3">
              {user.name}
            </Typography>
            <Typography className={classes.codename} variant="inherit" component="h3">
              @{user.codename}
            </Typography>
          </Box>
        </Box>

        <Box>
          <EditButton />
        </Box>
        <Box className={classes.followerComponent}>
          <Box>
            <Button className={followButtonClass} variant="contained" onClick={toggleFollowHandler}>
              {followButtonOption}
            </Button>
          </Box>
          <Box className={classes.followCounter}>
            <Typography className={classes.follower} variant="inherit" component="h3">
              {'フォロー：' + user.followerCount}
            </Typography>
            <Typography className={classes.follower} variant="inherit" component="h3">
              {'フォロワー：' + followeeCount}
            </Typography>
          </Box>
        </Box>
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
  header: {
    [theme.breakpoints.between('sm', 'md')]: {
      height: theme.spacing(40)
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      height: theme.spacing(24)
    }
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    top: -theme.spacing(9),
    [theme.breakpoints.between('sm', 'md')]: {
      width: theme.spacing(14),
      height: theme.spacing(14),
      top: -theme.spacing(8)
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      top: -theme.spacing(7)
    }
  },
  cardContent: {
    display: 'flex',
    maxHeight: theme.spacing(13),

    justifyContent: 'space-between'
  },
  nameAvatarComponent: {
    display: 'flex'
  },
  codename: {
    color: 'gray'
  },
  name: {
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '20px'
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '15px'
    }
  },
  followerComponent: {
    display: 'flex',
    [theme.breakpoints.between('sm', 'md')]: {
      display: 'flex'
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      display: 'inline'
    }
  },
  followCounter: {
    display: 'flex'
  },
  follower: {
    color: 'gray',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.between('sm', 'md')]: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      fontSize: '12px'
    }
  },
  followButtonOn: {
    top: theme.spacing(1),
    height: theme.spacing(5),
    marginLeft: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.between('xs', 'sm')]: {
      height: theme.spacing(4),
      marginLeft: theme.spacing(1),
      fontSize: '12px'
    }
  },
  followButtonOff: {
    top: theme.spacing(1),
    height: theme.spacing(5),
    marginLeft: theme.spacing(3),
    backgroundColor: theme.palette.grey[100],
    [theme.breakpoints.between('xs', 'sm')]: {
      height: theme.spacing(4),
      marginLeft: theme.spacing(1),
      fontSize: '12px'
    }
  }
}))

export default UserHeader
