// eslint-disable-next-line no-use-before-define
import React, { useRef, useState } from 'react'
import {
  DefaultDraftBlockRenderMap,
  DraftStyleMap,
  Editor,
  EditorState,
  ContentBlock
} from 'draft-js'
import { makeStyles } from '@material-ui/core'
import StyleButtons from './Buttons/StyleButtons'
import BlockTagButtons from './Buttons/BlockTagButtons'
import ColorButtons from './Buttons/ColorButtons'
// import blockRender from './Buttons/ExtraStyleButton'
// import { myBlockStyleFn, extendedBlockRenderMap } from './Buttons/ExtraStyleButton'
import Immutable from 'immutable'

const myCustomBlock = Immutable.Map({
  right: {
    element: 'div'
  },
  center: {
    element: 'div'
  },
  left: {
    element: 'div'
  }
})

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(myCustomBlock)

const RichEditor = () => {
  const classes = useStyle()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const ref = useRef<Editor>(null)

  const myBlockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType()
    switch (type) {
      case 'right':
        return classes[type]
      case 'center':
        return classes[type]
      case 'left':
        return classes[type]
      default:
        return type
    }
  }

  // const selectState = editorState.getSelection()
  // console.log(selectState.toJS())
  // console.log(editorState.toJS())

  // const contentState = editorState.getCurrentContent()
  // console.log(contentState.toJS())

  return (
    <div className={classes.root}>
      <div className={classes.buttons}>
        <StyleButtons editorState={editorState} setEditorState={setEditorState} />
        <BlockTagButtons editorState={editorState} setEditorState={setEditorState} />
        <ColorButtons editorState={editorState} setEditorState={setEditorState} />
      </div>
      <div className={classes.editor} onClick={() => ref.current?.focus()}>
        <Editor
          customStyleMap={customStyleMap}
          editorState={editorState}
          onChange={setEditorState}
          blockRenderMap={extendedBlockRenderMap}
          blockStyleFn={myBlockStyleFn}
          ref={ref}
        />
      </div>
    </div>
  )
}

/// customStyleMap
const customStyleMap: DraftStyleMap = {
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
    marginBottom: '5rem',
    minHeight: '50rem',
    padding: '1rem 1rem',
    fontSize: ' 18px ',
    cursor: 'text'
  },
  right: {
    textAlign: 'right'
  },
  center: {
    textAlign: 'center'
  },
  left: {
    textAlign: 'left'
  }
})

export default RichEditor

/// onclickが重なってしまうので、onclickがある場所にボタンを配置しては行けない！！！
