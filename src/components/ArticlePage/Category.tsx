// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { useDispatch, useSelector } from 'react-redux'
import { fetchArticleListCategory } from '../../reducer/articleListReducer'

const a11yProps = (index: any) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  }
}

const ScrollableTabsButtonAuto = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const userId = useSelector((state) => state.authReducer.id)
  const dispatch = useDispatch()
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categories = ['pet', 'sports', 'novel', 'IT', 'food']

  useEffect(() => {
    dispatch(fetchArticleListCategory({ categoryName: categories[value], userId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div className={classes.root}>
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
          <Tab label={categories[0]} {...a11yProps(0)} />
          <Tab label={categories[1]} {...a11yProps(1)} />
          <Tab label={categories[2]} {...a11yProps(2)} />
          <Tab label={categories[3]} {...a11yProps(3)} />
          <Tab label={categories[4]} {...a11yProps(4)} />
        </Tabs>
      </AppBar>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}))

export default ScrollableTabsButtonAuto
