// eslint-disable-next-line no-use-before-define
import React, { useRef, useState } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { Button, makeStyles } from '@material-ui/core'

// import BoldButton from './Buttons/BoldButton'

const RichEditor = () => {
  const classes = useStyle()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const ref = useRef<Editor>(null)

  const inlineChangeButton = (type: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, type))
  }

  const inlineTypes = ['BOLD', 'CODE', 'ITALIC', 'STRIKETHROUGH', 'UNDERLINE']

  const Buttons = inlineTypes.map((b) => {
    return (
      <Button key={b} onClick={() => inlineChangeButton(b)}>
        {b}
      </Button>
    )
  })

  return (
    <div className={classes.root}>
      {Buttons}
      <div className={classes.editor} onClick={() => ref.current?.focus()}>
        <Editor editorState={editorState} onChange={setEditorState} ref={ref} />
      </div>
    </div>
  )
}

const useStyle = makeStyles({
  root: {
    backgroundColor: '#f2ecd8',
    margin: '0 auto',
    height: '100vh',
    width: '100%'
  },
  editor: {
    height: '90vh',
    width: '90%',
    backgroundColor: 'white',
    boxShadow: '0 1px 2px #eee',
    margin: '0 auto',
    padding: '10px 10px',
    fontSize: ' 18px ',
    cursor: 'text'
  }
})

export default RichEditor

/// onclickが重なってしまうので、onclickがある場所にボタンを配置しては行けない！！！
