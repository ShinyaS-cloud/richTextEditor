// eslint-disable-next-line no-use-before-define
import React, { Fragment } from 'react'
import { EditorState, RichUtils } from 'draft-js'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import {
  Code,
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Title
} from '@material-ui/icons'

type Props = {
  editorState: EditorState
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

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
    handleClose()
    blockChangeButton(event, type)
  }

  return (
    <Fragment>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <Title />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem key="header-one" onClick={(e) => blockChangeButtonOpen(e, 'header-one')}>
          h1
        </MenuItem>
        <MenuItem key="header-two" onClick={(e) => blockChangeButtonOpen(e, 'header-two')}>
          h2
        </MenuItem>
        <MenuItem key="header-three" onClick={(e) => blockChangeButtonOpen(e, 'header-three')}>
          h3
        </MenuItem>
        <MenuItem key="header-four" onClick={(e) => blockChangeButtonOpen(e, 'header-four')}>
          h4
        </MenuItem>
        <MenuItem key="header-five" onClick={(e) => blockChangeButtonOpen(e, 'header-five')}>
          h5
        </MenuItem>
        <MenuItem key="header-six" onClick={(e) => blockChangeButtonOpen(e, 'header-six')}>
          h6
        </MenuItem>
      </Menu>
      <IconButton key="blockquote" onMouseDown={(e) => blockChangeButton(e, 'blockquote')}>
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
      </IconButton>
    </Fragment>
  )
}

export default BlockTagButtons
