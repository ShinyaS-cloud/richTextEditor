// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Button } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { convertToRaw, EditorState } from 'draft-js'
import axios from 'axios'

type Props = {
  editorState: EditorState
  title: string
}

const SaveButton: React.FC<Props> = (props) => {
  const save = async () => {
    const contentState = props.editorState.getCurrentContent()
    const content = convertToRaw(contentState)
    try {
      const res = await axios.post('/newpost', { data: { title: props.title, content: content } })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Button onClick={save} type="submit">
        <Save />
        保存
      </Button>
    </div>
  )
}

export default SaveButton