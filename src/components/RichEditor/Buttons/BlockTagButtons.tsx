// eslint-disable-next-line no-use-before-define
import React, { Fragment } from 'react'
import { EditorState, RichUtils } from 'draft-js'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
// import {
//   Code,
//   FormatAlignCenter,
//   FormatAlignLeft,
//   FormatAlignRight,
//   FormatListBulleted,
//   FormatListNumbered,
//   FormatQuote,
//   Title
// } from '@material-ui/icons'

type Props = {
  editorState: EditorState
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

const headingType = [
  'header-one',
  'header-two',
  'header-three',
  'header-four',
  'header-five',
  'header-six'
]

const blockType = [
  'blockquote',
  'code-block',
  'unordered-list-item',
  'ordered-list-item',
  'left',
  'center',
  'right'
]

const BlockTagButtons: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const blockChangeButton = (event: any, type: string) => {
    event.preventDefault() // ボタンにフォーカスさせないために必要
    props.setEditorState(RichUtils.toggleBlockType(props.editorState, type))
    return false
  }

  const blockChangeButtonOpen = (event: any, type: string) => {
    blockChangeButton(event, type)
    handleClose()
  }

  const HeadingComponent = headingType.map((h) => {
    return (
      <MenuItem key={h} onClick={(e) => blockChangeButtonOpen(e, h)}>
        {h}
      </MenuItem>
    )
  })

  const BlockChangeComponent = blockType.map((b) => {
    return (
      <IconButton key={b} onMouseDown={(e) => blockChangeButton(e, b)}>
        {b}
      </IconButton>
    )
  })

  return (
    <Fragment>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        H
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {HeadingComponent}
      </Menu>
      {BlockChangeComponent}
    </Fragment>
  )
}

export default BlockTagButtons

// eslint-disable-next-line no-lone-blocks
{
  /* <IconButton key="blockquote" onMouseDown={(e) => blockChangeButton(e, 'blockquote')}>
        <FormatQuote />
      </IconButton>
      <IconButton key="code-block" onMouseDown={(e) => blockChangeButton(e, 'code-block')}>
        <Code />
      </IconButton>
      <IconButton
        key="unordered-list-item"
        onMouseDown={(e) => blockChangeButton(e, 'unordered-list-item')}
      >
        <FormatListBulleted />
      </IconButton>
      <IconButton
        key="ordered-list-item"
        onMouseDown={(e) => blockChangeButton(e, 'ordered-list-item')}
      >
        <FormatListNumbered />
      </IconButton>
      <IconButton key="left" onMouseDown={(e) => blockChangeButton(e, 'left')}>
        <FormatAlignLeft />
      </IconButton>
      <IconButton key="center" onMouseDown={(e) => blockChangeButton(e, 'center')}>
        <FormatAlignCenter />
      </IconButton>
      <IconButton key="right" onMouseDown={(e) => blockChangeButton(e, 'right')}>
        <FormatAlignRight />
      </IconButton> */
}
