// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import ArticleCard from '../ArticlePage/ArticleCard'
import { fetchArticleListFavorite } from '../../reducer/articleListReducer'
import { Box, makeStyles } from '@material-ui/core'

const FavoriteList = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.userReducer)
  const article = useSelector((state) => state.articleListReducer.article)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticleListFavorite(user.id))
  }, [dispatch, user.id])

  const renderMap = article.map((a) => {
    return <ArticleCard key={a.id} article={a} />
  })

  return <Box className={classes.content}>{renderMap}</Box>
}

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
}))

export default FavoriteList
