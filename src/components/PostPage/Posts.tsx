// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import { Box, CircularProgress, makeStyles } from '@material-ui/core'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArticleCategory } from '../../reducer/postReducer'

const Posts = () => {
  const classes = useStyle()
  const dispatch = useDispatch()
  const article = useSelector((state) => state.postReducer.article)
  const loading = useSelector((state) => state.postReducer.loading)

  useEffect(() => {
    dispatch(fetchArticleCategory(''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const renderMap = article.map((a) => {
    return <Card key={a.id} article={a} />
  })

  let renderContent: any = <Box className={classes.root}>{renderMap}</Box>

  if (loading) {
    renderContent = (
      <Box className={classes.circular}>
        <CircularProgress size="5rem" />
      </Box>
    )
  }

  return <div>{renderContent}</div>
}

const useStyle = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  circular: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100px'
  }
})

export default Posts
