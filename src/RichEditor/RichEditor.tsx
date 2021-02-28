// eslint-disable-next-line no-use-before-define
import React, { useState, useRef } from 'react'
import Editor from '@draft-js-plugins/editor'
import { EditorState } from 'draft-js'
import { makeStyles } from '@material-ui/core'
import createToolbarPlugin from '@draft-js-plugins/static-toolbar'
const toolbarPlugin = createToolbarPlugin()
const { Toolbar } = toolbarPlugin
const plugins = [toolbarPlugin]

const RichEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const classes = useStyle()
  const ref = useRef<Editor>(null)

  return (
    <div>
      <div className={classes.root} onClick={() => ref.current?.focus()}>
        <Editor editorState={editorState} onChange={setEditorState} plugins={plugins} ref={ref} />
        <Toolbar />
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
