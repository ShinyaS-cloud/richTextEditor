// eslint-disable-next-line no-use-before-define
import React from 'react'
import { EditorState } from 'draft-js'
import { Button } from '@material-ui/core'

type Props = {
  editorState: EditorState
  inlineChangeButton: (type: string) => EditorState
}

const BoldButton: React.FC<Props> = (props) => {
  return (
    <div>
      <Button color="primary" variant="contained" >
        BOLD
      </Button>
    </div>
  )
}

export default BoldButton
