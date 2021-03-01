// eslint-disable-next-line no-use-before-define
import React, { useRef } from 'react'
import buttonReducer, { contentToEditor, editorToContent } from '../store/buttonReducer'
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { makeStyles } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import BoldButton from './Buttons/BoldButton'

const RichEditor = () => {
  const classes = useStyle()
  const dispatch = useDispatch()
  const ref = useRef<Editor>(null)
  const contentState = useSelector((state) => convertFromRaw(state.buttonReducer.contentState))
  const editorState = contentToEditor(contentState)
  const setEditorState = (editorState: EditorState) => {
    const setContent = convertToRaw(editorToContent(editorState))
    dispatch(buttonReducer.actions.newEditorState(setContent))
  }
  return (
    <div>
      <div className={classes.root} onClick={() => ref.current?.focus()}>
        <Editor editorState={editorState} onChange={setEditorState} ref={ref} />
        <BoldButton />
      </div>
    </div>
  )
}

const useStyle = makeStyles({
  root: {
    backgroundColor: 'gray',
    boxShadow: '0 3px 5px 2px #eee',
    height: '50vh',
    width: '50vw',
    margin: '0 auto',
    padding: '20px 30px',
    fontSize: ' 18px ',
    cursor: 'text'
  }
})

export default RichEditor
