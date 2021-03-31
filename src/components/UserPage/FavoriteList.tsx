// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import ArticleCard from '../ArticlePage/ArticleCard'
import articleListReducer, { fetchArticleListFavorite } from '../../reducer/articleListReducer'
import { Box, makeStyles } from '@material-ui/core'

const FavoriteList = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.userReducer)
  const articleList = useSelector((state) => state.articleListReducer)
  const article = articleList.article.slice(1)
  const [next, setNext] = useState(12)
  const userId = user.id

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticleListFavorite({ userId, next: 0 }))
    return () => {
      dispatch(articleListReducer.actions.articleInit())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const fetchData = () => {
    try {
      if (articleList.hasMore) {
        setNext(next + 12)
        dispatch(fetchArticleListFavorite({ userId, next }))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const scrollEventHandler = () => {
    const documentHeight = document.body.clientHeight // ページ全体の高さ
    const windowHeight = window.innerHeight // ウィンドウの高さ
    const bottom = documentHeight - windowHeight // ページ全体の高さ - ウィンドウの高さ = ページの最下部位置
    if (bottom <= document.documentElement.scrollTop) {
      // 一番下までスクロールした時に実行
      fetchData()
    }
  }
  window.onscroll = scrollEventHandler

  let renderMap
  if (article) {
    renderMap = article.map((a) => {
      return <ArticleCard key={a.id} article={a} />
    })
  } else {
    renderMap = <div>投稿はまだありません</div>
  }

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
