// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArticleCategory } from '../../reducer/postReducer'

const Posts = () => {
  const classes = useStyle()
  const dispatch = useDispatch()
  const article = useSelector((state) => state.postReducer.article)

  useEffect(() => {
    dispatch(fetchArticleCategory(''))
  }, [dispatch])

  const renderContent = article.map((a) => {
    console.log(a.userName)
    return <Card key={a.articleId} article={a} />
  })

  return <Box className={classes.root}>{renderContent}</Box>
}

const useStyle = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
})

export default Posts
