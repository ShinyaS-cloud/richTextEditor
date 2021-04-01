// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import userReducer, { fetchProfile } from '../../reducer/userReducer'
import { useParams } from 'react-router'

import UserArticleList from '../UtilComponent/ArticleListComponent'
import qs from 'qs'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import FollowList from './FollowList'

type Params = { codename: string }

const UserPage = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.userReducer)
  const authUser = useSelector((state) => state.authReducer)
  const [value, setValue] = useState(0)
  const [followState, setFollowState] = useState(user.isFollow)

  const history = useHistory()
  const fromUserId = authUser.authUserId

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const a11yProps = (index: any) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const toggleFollowHandler = async () => {
    try {
      const { data } = await axios.post(
        '/api/follow',
        qs.stringify({ fromUserId, toUserId: user.id })
      )
      if (!data) {
        history.push('/login')
      } else {
        setFollowState(data.isFollow)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const RenderComponent = () => {
    switch (value) {
      case 0:
        return <UserArticleList type="user" />
      case 1:
        return <UserArticleList type="favorite" />
      case 2:
        return <FollowList type={true} />
      case 3:
        return <FollowList type={false} />
      default:
        return <UserArticleList type="user" />
    }
  }

  const followButtonOption = followState ? 'フォロー解除' : 'フォロー'
  const followButtonClass = followState ? classes.followButtonOff : classes.followButtonOn

  const param = useParams<Params>()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProfile(param.codename))
    return () => {
      dispatch(userReducer.actions.userInit())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
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
            {'フォローしている：' + user.followerCount}
          </Typography>
          <Typography className={classes.follower} variant="inherit" component="h3">
            {'フォローされている：' + user.followeeCount}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.introduction}
          </Typography>
        </CardContent>
        <div className={classes.appBar}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label={user.codename + 'の記事'} {...a11yProps(0)} />
              <Tab label="お気に入り" {...a11yProps(1)} />
              <Tab label="フォローしている" {...a11yProps(2)} />
              <Tab label="フォローされている" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
        </div>
        <RenderComponent />
      </Card>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    margin: '0 auto'
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    top: -theme.spacing(9)
  },
  card: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  cardContent: {
    display: 'flex'
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
  appBar: {
    backgroundColor: theme.palette.background.paper
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

export default UserPage
