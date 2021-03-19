// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from '../../reducer/profileReducer'
import { useParams } from 'react-router'
import ArticleCard from '../ArticlePage/ArticleCard'
import { fetchArticleListUser } from '../../reducer/articleListReducer'

type Params = { codename: string }

const UserPage = () => {
  const classes = useStyles()
  const profile = useSelector((state) => state.profileReducer)
  const article = useSelector((state) => state.articleListReducer.article)

  const param = useParams<Params>()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProfile(param.codename))
  }, [dispatch, param])

  useEffect(() => {
    dispatch(fetchArticleListUser(profile.usersId))
  }, [dispatch, profile.usersId])

  const renderMap = article.map((a) => {
    return <ArticleCard key={a.id} article={a} />
  })

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia component="img" height="300" src={profile.headerUrl} />
        <CardContent className={classes.cardContent}>
          <Avatar
            className={classes.avater}
            src={process.env.PUBLIC_URL + '/' + profile.avatarUrl}
          />
          <Box>
            <Typography variant="h5" component="h3">
              {profile.name}
            </Typography>
            <Typography className={classes.codename} variant="inherit" component="h3">
              @{profile.users.codename}
            </Typography>
          </Box>
        </CardContent>
        <Box className={classes.content}>{renderMap}</Box>
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
    marginTop: theme.spacing(5)
  },
  cardContent: {
    display: 'flex'
  },
  codename: {
    color: 'gray'
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
}))

export default UserPage
