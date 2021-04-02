// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import { AppBar, Card, makeStyles, Tab, Tabs } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import userReducer, { fetchProfile } from '../../reducer/userReducer'
import { useParams } from 'react-router'

import UserArticleList from '../UtilComponent/ArticleListComponent'

import FollowList from './FollowList'
import UserHeader from './UserHeader'

type Params = { codename: string }

const UserPage = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.userReducer)
  const [value, setValue] = useState(0)

  console.log(user)

  const param = useParams<Params>()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProfile(param.codename))
    return () => {
      dispatch(userReducer.actions.userInit())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const a11yProps = (index: any) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
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
      case 4:
        return <UserArticleList type="comment" />
      default:
        return <UserArticleList type="user" />
    }
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <UserHeader />
        <div className={classes.appBar}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="simple tabs example"
            >
              <Tab label={user.name + 'の記事'} {...a11yProps(0)} />
              <Tab label="お気に入り" {...a11yProps(1)} />
              <Tab label="フォローしている" {...a11yProps(2)} />
              <Tab label="フォローされている" {...a11yProps(3)} />
              <Tab label="コメントを付けた記事" {...a11yProps(4)} />
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
  appBar: {
    backgroundColor: theme.palette.background.paper
  }
}))

export default UserPage
