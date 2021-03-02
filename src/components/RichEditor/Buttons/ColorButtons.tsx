// eslint-disable-next-line no-use-before-define
import React from 'react'
import { EditorState, RichUtils, Modifier } from 'draft-js'
import { Button, makeStyles } from '@material-ui/core'
type Props = {
  editorState: EditorState
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}
const ColorButtons: React.FC<Props> = (props) => {
  /// 色変形
  const classes = useStyle()
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
    const selection = props.editorState.getSelection()

    const nextContentState = Object.keys(colorStyleMap).reduce((contentState, color) => {
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
    { label: 'Red', style: 'red' },
    { label: 'Orange', style: 'orange' },
    { label: 'Yellow', style: 'yellow' },
    { label: 'Green', style: 'green' },
    { label: 'Blue', style: 'blue' },
    { label: 'Indigo', style: 'indigo' },
    { label: 'Violet', style: 'violet' }
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
