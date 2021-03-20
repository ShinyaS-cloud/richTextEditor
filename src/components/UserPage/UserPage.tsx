// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../../reducer/userReducer'
import { useParams } from 'react-router'

import FavoriteList from './FavoriteList'
import UserArticleList from './UserArticleList'

type Params = { codename: string }

const UserPage = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.userReducer)
  const [value, setValue] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const a11yProps = (index: any) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const renderComponent = <div>{value === 0 ? <UserArticleList /> : <FavoriteList />}</div>

  const param = useParams<Params>()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProfile(param.codename))
  }, [dispatch, param])

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia component="img" height="300" src={user.headerUrl} />
        <CardContent className={classes.cardContent}>
          <Avatar className={classes.avater} src={process.env.PUBLIC_URL + '/' + user.avatarUrl} />
          <Box>
            <Typography variant="h5" component="h3">
              {user.name}
            </Typography>
            <Typography className={classes.codename} variant="inherit" component="h3">
              @{user.codename}
            </Typography>
          </Box>
        </CardContent>
        <div className={classes.appbar}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label={user.codename + 'の記事'} {...a11yProps(0)} />
              <Tab label="お気に入り" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
        </div>

        {renderComponent}
      </Card>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    margin: '0 auto'
  },
  avater: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    top: -theme.spacing(7)
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
  appbar: {
    backgroundColor: theme.palette.background.paper
  }
}))

export default UserPage
