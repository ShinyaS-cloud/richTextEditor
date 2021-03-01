// eslint-disable-next-line no-use-before-define
import React, { useRef, useState } from 'react'
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js'
import { Button, ButtonGroup, makeStyles } from '@material-ui/core'

// import BoldButton from './Buttons/BoldButton'

const RichEditor = () => {
  const classes = useStyle()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const ref = useRef<Editor>(null)

  /// inlineの文字変形
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

  /// ブロックタグの変形
  const blockChangeButton = (type: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, type))
  }
  const blockTypes = [
    'header-one',
    'header-two',
    'header-three',
    'header-four',
    'header-five',
    'header-six',
    'blockquote',
    'code-block',
    'atomic',
    'unordered-list-item',
    'ordered-list-item'
  ]

  const BlockButtons = blockTypes.map((b) => {
    return (
      <Button key={b} onClick={() => blockChangeButton(b)}>
        {b}
      </Button>
    )
  })
  /// 色変形

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

  const toggleColor = (toggledColor: string) => {
    const selection = editorState.getSelection()

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap).reduce((contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color)
    }, editorState.getCurrentContent())

    let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style')

    const currentStyle = editorState.getCurrentInlineStyle()

    // Unset style override for current color.
    // if (selection.isCollapsed()) {
    //   nextEditorState = currentStyle.reduce((state, color) => {
    //     return RichUtils.toggleInlineStyle(state, color)
    //   }, nextEditorState)
    // }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toggledColor)
    }

    setEditorState(nextEditorState)
  }

  const COLORS = [
    { label: 'Red', style: 'red' },
    { label: 'Orange', style: 'orange' },
    { label: 'Yellow', style: 'yellow' },
    { label: 'Green', style: 'green' },
    { label: 'Blue', style: 'blue' },
    { label: 'Indigo', style: 'indigo' },
    { label: 'Violet', style: 'violet' }
  ]

  const colorControls = () => {
    const currentStyle = editorState.getCurrentInlineStyle()
    return (
      <div className={classes.controls}>
        {COLORS.map((type) => (
          <Button
            key={type.label}
            disabled={currentStyle.has(type.style)}
            onClick={() => toggleColor(type.style)}
          >
            {type.label}
          </Button>
        ))}
      </div>
    )
  }

  const ColorChange = colorControls()

  return (
    <div className={classes.root}>
      <div className={classes.buttons}>
        <ButtonGroup size="large" aria-label="contained primary button group">
          {Buttons}
          {BlockButtons}
          {ColorChange}
        </ButtonGroup>
      </div>
      <div className={classes.editor} onClick={() => ref.current?.focus()}>
        <Editor editorState={editorState} onChange={setEditorState} ref={ref} />
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
    height: '100vh',
    width: '100%'
  },
  buttons: {
    margin: '0 auto',
    textAlign: 'center'
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
  },
  controls: {
    fontFamily: "'Helvetica', sans-serif",
    fontSize: 14,
    marginBottom: 10,
    userSelect: 'none'
  },
  styleButton: {
    color: '#999',
    cursor: 'pointer',
    marginRight: 16,
    padding: '2px 0'
  }
})

export default RichEditor

/// onclickが重なってしまうので、onclickがある場所にボタンを配置しては行けない！！！
