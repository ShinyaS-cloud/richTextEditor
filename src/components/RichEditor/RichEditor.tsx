// eslint-disable-next-line no-use-before-define
import React, { useRef, useState } from 'react'
import { Editor, EditorState } from 'draft-js'
import { makeStyles } from '@material-ui/core'
import StyleButtons from './Buttons/StyleButtons'
import BlockTagButtons from './Buttons/BlockTagButtons'
import ColorButtons from './Buttons/ColorButtons'

const RichEditor = () => {
  const classes = useStyle()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const ref = useRef<Editor>(null)

  // const ColorChange = colorControls()
  const colorStyleMap = {
    red: {
      color: 'rgba(255, 0, 0, 1.0)'
    },
    orange: {
      color: 'rgba(255, 127, 0, 1.0)'
    },
    yellow: {
      color: 'rgba(180, 180, 0, 1.0)'
    },
    green: {
      color: 'rgba(0, 180, 0, 1.0)'
    },
    blue: {
      color: 'rgba(0, 0, 255, 1.0)'
    },
    indigo: {
      color: 'rgba(75, 0, 130, 1.0)'
    },
    violet: {
      color: 'rgba(127, 0, 255, 1.0)'
    }
  }
  return (
    <div className={classes.root}>
      <div className={classes.buttons}>
        <StyleButtons editorState={editorState} setEditorState={setEditorState} />
        <BlockTagButtons editorState={editorState} setEditorState={setEditorState} />
        <ColorButtons editorState={editorState} setEditorState={setEditorState} />
      </div>
      <div className={classes.editor} onClick={() => ref.current?.focus()}>
        <Editor
          customStyleMap={colorStyleMap}
          editorState={editorState}
          onChange={setEditorState}
          ref={ref}
        />
      </div>
    </div>
  )
}

/// style
const useStyle = makeStyles({
  root: {
    backgroundColor: '#f2ecd8',
    backgroundAttachment: 'fixed',
    margin: '0 auto',
    width: '100%',
    height: '100vh',
    overflowY: 'auto'
  },
  buttons: {
    margin: '0 auto',
    textAlign: 'center'
  },
  editor: {
    width: '80%',
    backgroundColor: 'white',
    boxShadow: '0 1px 2px #eee',
    margin: '0 auto',
    marginBottom: '20px',
    padding: '10px 10px',
    fontSize: ' 18px ',
    cursor: 'text'
  }
})

export default RichEditor

/// onclickが重なってしまうので、onclickがある場所にボタンを配置しては行けない！！！
