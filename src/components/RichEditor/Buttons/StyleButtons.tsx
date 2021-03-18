// eslint-disable-next-line no-use-before-define
import React, { Fragment } from 'react'
import { EditorState, RichUtils } from 'draft-js'
import { IconButton } from '@material-ui/core'
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

const inlineStyleType = ['BOLD', 'CODE', 'ITALIC', 'STRIKETHROUGH', 'UNDERLINE']

/// inlineの文字変形
const StyleButtons: React.FC<Props> = (props) => {
  const inlineChangeButton = (type: string) => {
    props.setEditorState(RichUtils.toggleInlineStyle(props.editorState, type))
  }

  const renderComponent = inlineStyleType.map((i) => {
    return (
      <IconButton key={i} onClick={() => inlineChangeButton(i)}>
        {i}
      </IconButton>
    )
  })

  return <Fragment>{renderComponent}</Fragment>
}

export default StyleButtons

// eslint-disable-next-line no-lone-blocks
{
  /* <IconButton key="BOLD" onClick={() => inlineChangeButton('BOLD')}>
<FormatBold />
</IconButton>
<IconButton key="CODE" onClick={() => inlineChangeButton('CODE')}>
<Code />
</IconButton>
<IconButton key="ITALIC" onClick={() => inlineChangeButton('ITALIC')}>
<FormatItalic />
</IconButton>
<IconButton key="STRIKETHROUGH" onClick={() => inlineChangeButton('STRIKETHROUGH')}>
<FormatStrikethrough />
</IconButton>
<IconButton key="UNDERLINE" onClick={() => inlineChangeButton('UNDERLINE')}>
<FormatUnderlined />
</IconButton> */
}
