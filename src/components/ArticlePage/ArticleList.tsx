// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Box, CircularProgress, makeStyles } from '@material-ui/core'
import ArticleCard from './ArticleCard'
import { useSelector } from 'react-redux'

import Category from './Category'

const Posts = () => {
  const classes = useStyle()
  const article = useSelector((state) => state.articleListReducer.article)
  const loading = useSelector((state) => state.articleListReducer.loading)

  const renderMap = article.map((a) => {
    return <ArticleCard key={a.id} article={a} />
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
