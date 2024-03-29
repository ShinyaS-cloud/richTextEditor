// eslint-disable-next-line no-use-before-define
import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'

const MyCircular: React.FC = () => {
  const classes = useStyle()
  return (
    <div className={classes.circular}>
      <CircularProgress size="5rem" />
    </div>
  )
}

const useStyle = makeStyles({
  circular: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100px'
  }
})

export default MyCircular
