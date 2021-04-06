// eslint-disable-next-line no-use-before-define
import React from 'react'
import { EditorState, RichUtils, Modifier } from 'draft-js'
import { makeStyles, Radio } from '@material-ui/core'
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

  type Colors = keyof typeof colorStyleMap

  const selection = props.editorState.getSelection()
  const currentStyle = props.editorState.getCurrentInlineStyle()

  const toggleColor = (toggledColor: string) => {
    const nextContentState = Object.keys(colorStyleMap).reduce((contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color)
    }, props.editorState.getCurrentContent())

    let nextEditorState = EditorState.push(
      props.editorState,
      nextContentState,
      'change-inline-style'
    )

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

  const COLORS: { label: string; style: Colors }[] = [
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
        <Radio
          key={type.label}
          color="default"
          checked={currentStyle.has(type.style)}
          value={type.style}
          className={classes[type.style]}
          // disabled={currentStyle.has(type.style)}
          onMouseDown={(e: any) => onToggle(e, type.style)}
        />
      ))}
    </div>
  )
}

const useStyle = makeStyles({
  controls: {
    fontSize: 14,
    marginBottom: 10,
    userSelect: 'none'
  },
  black: {
    color: 'rgba(0, 0, 0, 1.0)',
    '&$checked': { color: 'rgba(0, 0, 0, 1.0)' }
  },
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
    '&$checked': { color: 'rgba(255, 0, 0, 1.0)' }
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
    '&$checked': { color: 'rgba(255, 127, 0, 1.0)' }
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
    '&$checked': { color: 'rgba(180, 180, 0, 1.0)' }
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
    '&$checked': { color: 'rgba(0, 180, 0, 1.0)' }
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
    '&$checked': { color: 'rgba( 0 , 0 , 255, 1.0)' }
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
    '&$checked': { color: 'rgba(75, 0, 130, 1.0)' }
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
    '&$checked': { color: 'rgba(127, 0, 255, 1.0)' }
  },
  checked: {}
})

export default ColorButtons
