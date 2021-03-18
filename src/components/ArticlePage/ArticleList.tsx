// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import { Box, CircularProgress, makeStyles } from '@material-ui/core'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArticleListCategory } from '../../reducer/articleListReducer'
import Category from './Category'

const Posts = () => {
  const classes = useStyle()
  const dispatch = useDispatch()
  const usersId = useSelector((state) => state.authReducer.id)
  const article = useSelector((state) => state.articleListReducer.article)
  const loading = useSelector((state) => state.articleListReducer.loading)

  useEffect(() => {
    dispatch(fetchArticleListCategory({ categoryName: 'pet', usersId }))
  }, [dispatch, usersId])

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

  return (
    <div>
      <Category />
      {renderContent}
    </div>
  )
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
