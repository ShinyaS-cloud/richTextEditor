// eslint-disable-next-line no-use-before-define
import React from 'react'
import { EditorState, RichUtils } from 'draft-js'
import { Box, IconButton, makeStyles } from '@material-ui/core'
import { FormatBold, FormatItalic, FormatStrikethrough, FormatUnderlined } from '@material-ui/icons'
// import {
//   FormatBold,
//   Code,
//   FormatItalic,
//   FormatStrikethrough,
//   FormatUnderlined
// } from '@material-ui/icons'

type Props = {
  editorState: EditorState
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

// const inlineStyleType = ['BOLD', 'CODE', 'ITALIC', 'STRIKETHROUGH', 'UNDERLINE']

/// inlineの文字変形
const StyleButtons: React.FC<Props> = (props) => {
  const inlineChangeButton = (type: string) => {
    props.setEditorState(RichUtils.toggleInlineStyle(props.editorState, type))
  }
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <IconButton key="BOLD" onClick={() => inlineChangeButton('BOLD')}>
        <FormatBold />
      </IconButton>
      <IconButton key="ITALIC" onClick={() => inlineChangeButton('ITALIC')}>
        <FormatItalic />
      </IconButton>
      <IconButton key="STRIKETHROUGH" onClick={() => inlineChangeButton('STRIKETHROUGH')}>
        <FormatStrikethrough />
      </IconButton>
      <IconButton key="UNDERLINE" onClick={() => inlineChangeButton('UNDERLINE')}>
        <FormatUnderlined />
      </IconButton>{' '}
    </Box>
  )
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  }
})

export default StyleButtons
