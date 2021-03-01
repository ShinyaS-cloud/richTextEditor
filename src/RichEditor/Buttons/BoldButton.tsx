// eslint-disable-next-line no-use-before-define
import React from 'react'
import buttonReducer from '../../store/buttonReducer'
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'

const BoldButton = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={() =>
          dispatch(buttonReducer.actions.inlineChangeButton('BOLD'))
        }
      >
        BOLD
      </Button>
    </div>
  )
}

export default BoldButton
