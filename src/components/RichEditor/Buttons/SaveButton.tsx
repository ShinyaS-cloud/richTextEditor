// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Button } from '@material-ui/core'

import { convertToRaw, EditorState } from 'draft-js'
import axios from 'axios'
import { useHistory } from 'react-router'

type Props = {
  editorState: EditorState
  category: number
  title: string
  articleId: string
  codename: string
  abstract: string
  isPublic: boolean
}

const SaveButton: React.FC<Props> = (props) => {
  const history = useHistory()
  const save = async () => {
    const contentState = props.editorState.getCurrentContent()
    const content = convertToRaw(contentState)
    const saveContent = {
      data: {
        articleId: +props.articleId,
        title: props.title,
        category: props.category,
        abstract: props.abstract,
        isPublic: props.isPublic,
        content: content
      }
    }
    try {
      console.log(props.codename)
      await axios.post('/api/save', saveContent)
      history.push('/' + props.codename)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Button variant="contained" color="primary" onClick={save} type="submit">
        保存
      </Button>
    </div>
  )
}

export default SaveButton
