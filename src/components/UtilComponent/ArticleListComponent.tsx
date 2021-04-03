// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import ArticleCard from './ArticleCard'
import articleListReducer, { fetchArticleList } from '../../reducer/articleListReducer'
import { AppBar, Box, makeStyles, Tab, Tabs } from '@material-ui/core'
import MyCircular from './myCircular'

type Props = {
  type: 'user' | 'favorite' | 'category' | 'comment'
}

const ArticleListComponent: React.FC<Props> = (props) => {
  const classes = useStyles()
  const user = useSelector((state) => state.userReducer)
  const articleList = useSelector((state) => state.articleListReducer)
  const article = articleList.article.slice(1)
  const [value, setValue] = useState(0)
  const [next, setNext] = useState(12)
  const userId = user.id
  const loading = articleList.loading

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticleList({ userId, next: 0, type: props.type, categoryNumber: value }))
    return () => {
      dispatch(articleListReducer.actions.articleInit())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const fetchData = () => {
    try {
      if (articleList.hasMore) {
        setNext(next + 12)
        dispatch(fetchArticleList({ userId, next, type: props.type, categoryNumber: value }))
        return
      }
      return
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

  useEffect(() => {
    document.addEventListener('scroll', scrollEventHandler)
    return () => document.removeEventListener('scroll', scrollEventHandler)
  })

  const LoadingComponent = () => {
    if (loading) {
      return <MyCircular />
    }
    return <div></div>
  }

  let Loading = <div></div>
  if (loading) {
    Loading = <LoadingComponent />
  }
  let renderMap
  if (article) {
    renderMap = article.map((a) => {
      return <ArticleCard key={a.id} article={a} />
    })
  } else {
    renderMap = <div>投稿はまだありません</div>
  }

  const Category = () => {
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue)
      setNext(12)
    }
    const a11yProps = (index: any) => {
      return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`
      }
    }
    const categoriesJa = ['ペット', 'スポーツ', '小説', 'IT', 'フード', '未分類']
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

  return (
    <Box>
      <Category />
      <Box className={classes.content}>{renderMap}</Box>
      {Loading}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
}))

export default ArticleListComponent
