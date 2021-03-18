// eslint-disable-next-line no-use-before-define
import React from 'react'
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}))

const ScrollableTabsButtonAuto = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const usersId = useSelector((state) => state.authReducer.id)
  const dispatch = useDispatch()
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
    dispatch(fetchArticleListCategory({ categoryName: categories[value], usersId }))
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categories = ['pet', 'sports', 'novel', 'IT', 'food']

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
          <Tab label={categories[0]} {...a11yProps(4)} />
          <Tab label={categories[1]} {...a11yProps(0)} />
          <Tab label={categories[2]} {...a11yProps(1)} />
          <Tab label={categories[3]} {...a11yProps(2)} />
          <Tab label={categories[4]} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
    </div>
  )
}

export default ScrollableTabsButtonAuto
