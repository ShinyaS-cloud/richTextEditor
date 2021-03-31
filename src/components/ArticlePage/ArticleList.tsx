// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
// import React, { useState } from 'react'
import { AppBar, Box, makeStyles, Tab, Tabs } from '@material-ui/core'
import ArticleCard from './ArticleCard'
import { useDispatch, useSelector } from 'react-redux'

import articleReducer, { fetchArticleListCategory } from '../../reducer/articleListReducer'
import MyCircular from '../UtilComponent/myCircular'

const a11yProps = (index: any) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  }
}

const ArticleList = () => {
  const classes = useStyle()

  const userId = useSelector((state) => state.authReducer.id)
  const articleList = useSelector((state) => state.articleListReducer)
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)
  const [next, setNext] = useState(12)
  const article = articleList.article.slice(1)
  const loading = articleList.loading

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
    setNext(12)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categories = ['uncategorized', 'pet', 'sports', 'novel', 'IT', 'food']
  const categoriesJa = ['未分類', 'ペット', 'スポーツ', '小説', 'IT', 'フード']

  useEffect(() => {
    dispatch(fetchArticleListCategory({ categoryName: categories[value], userId, next: 0 }))
    return () => {
      dispatch(articleReducer.actions.articleInit())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const Category = () => {
    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label={categoriesJa[0]} {...a11yProps(0)} />
            <Tab label={categoriesJa[1]} {...a11yProps(1)} />
            <Tab label={categoriesJa[2]} {...a11yProps(2)} />
            <Tab label={categoriesJa[3]} {...a11yProps(3)} />
            <Tab label={categoriesJa[4]} {...a11yProps(4)} />
            <Tab label={categoriesJa[5]} {...a11yProps(5)} />
          </Tabs>
        </AppBar>
      </div>
    )
  }

  const fetchData = () => {
    try {
      if (articleList.hasMore) {
        setNext(next + 12)
        dispatch(fetchArticleListCategory({ categoryName: categories[value], userId, next }))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const LoadingComponent = () => {
    if (loading) {
      return <MyCircular />
    }
    return <div></div>
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

  return (
    <Box>
      <Category />
      <Box className={classes.cards}>
        {article.map((a: any) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </Box>
      <LoadingComponent />
    </Box>
  )
}

const useStyle = makeStyles((theme) => ({
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
}))

export default ArticleList
