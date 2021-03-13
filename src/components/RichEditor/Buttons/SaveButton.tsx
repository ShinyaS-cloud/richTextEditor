// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Button } from '@material-ui/core'

import { convertToRaw, EditorState } from 'draft-js'
import axios from 'axios'

type Props = {
  editorState: EditorState
  category: 'pet' | 'sports' | 'novel' | 'IT' | 'food'
  title: string
  articleId: string
}

const SaveButton: React.FC<Props> = (props) => {
  const save = async () => {
    const contentState = props.editorState.getCurrentContent()
    const content = convertToRaw(contentState)
    try {
      const res = await axios.post('/api/save/', {
        data: {
          id: +props.articleId,
          title: props.title,
          category: props.category,
          content: content
        }
      })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Button onClick={save} type="submit">
        保存
      </Button>
    </div>
  )
}

export default SaveButton
