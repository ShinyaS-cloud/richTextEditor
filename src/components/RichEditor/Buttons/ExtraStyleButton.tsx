// eslint-disable-next-line no-use-before-define
import React from 'react'
import { EditorState, RichUtils, Modifier } from 'draft-js'
import { Button, makeStyles } from '@material-ui/core'
type Props = {
  editorState: EditorState
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}
const ColorButtons: React.FC<Props> = (props) => {
  /// 位置変形
  const classes = useStyle()
  const customStyleMap = {
    right: {
      textAlign: 'right'
    },
    center: {
      textAlign: 'center'
    },
    left: {
      textAlign: 'left'
    }
  }
  const toggleColor = (toggledColor: string) => {
    const selection = props.editorState.getSelection()

    const nextContentState = Object.keys(customStyleMap).reduce((contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color)
    }, props.editorState.getCurrentContent())

    let nextEditorState = EditorState.push(
      props.editorState,
      nextContentState,
      'change-inline-style'
    )

    const currentStyle = props.editorState.getCurrentInlineStyle()

    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state = nextEditorState, color = '') => {
        return RichUtils.toggleInlineStyle(state, color)
      }, nextEditorState)
    }

    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toggledColor)
    }
    props.setEditorState(nextEditorState)
  }

  const COLORS = [
    { label: 'Right', style: 'right' },
    { label: 'Center', style: 'Center' },
    { label: 'left', style: 'left' }
  ]

  // const currentStyle = editorState.getCurrentInlineStyle()
  const onToggle = (event: any, type: string) => {
    event.preventDefault() // ボタンにフォーカスさせないために必要
    toggleColor(type)
    return false
  }
  return (
    <div className={classes.controls}>
      {COLORS.map((type) => (
        <Button
          key={type.label}
          // disabled={currentStyle.has(type.style)}
          onMouseDown={(e) => onToggle(e, type.style)}
        >
          {type.label}
        </Button>
      ))}
    </div>
  )
}

const useStyle = makeStyles({
  controls: {
    fontFamily: "'Helvetica', sans-serif",
    fontSize: 14,
    marginBottom: 10,
    userSelect: 'none'
  }
})

export default ColorButtons
