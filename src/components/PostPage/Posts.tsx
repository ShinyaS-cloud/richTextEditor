// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Box, makeStyles } from '@material-ui/core'
import Card from './Card'

const Posts = () => {
  const classes = useStyle()
  return (
    <Box className={classes.root}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Box>
  )
}

const useStyle = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
})

export default Posts
