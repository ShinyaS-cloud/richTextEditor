// eslint-disable-next-line no-use-before-define
import React, { Fragment } from 'react'
import { EditorState, RichUtils } from 'draft-js'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import {
  Code,
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

  const blockChangeButton = (type: string) => {
    props.setEditorState(RichUtils.toggleBlockType(props.editorState, type))
  }

  const blockChangeButtonOpen = (type: string) => {
    handleClose()
    blockChangeButton(type)
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
        <MenuItem key="header-one" onClick={() => blockChangeButtonOpen('header-one')}>
          h1
        </MenuItem>
        <MenuItem key="header-two" onClick={() => blockChangeButtonOpen('header-two')}>
          h2
        </MenuItem>
        <MenuItem key="header-three" onClick={() => blockChangeButtonOpen('header-three')}>
          h3
        </MenuItem>
        <MenuItem key="header-four" onClick={() => blockChangeButtonOpen('header-four')}>
          h4
        </MenuItem>
        <MenuItem key="header-five" onClick={() => blockChangeButtonOpen('header-five')}>
          h5
        </MenuItem>
        <MenuItem key="header-six" onClick={() => blockChangeButtonOpen('header-six')}>
          h6
        </MenuItem>
      </Menu>
      <IconButton key="blockquote" onClick={() => blockChangeButton('blockquote')}>
        <FormatQuote />
      </IconButton>
      <IconButton key="code-block" onClick={() => blockChangeButton('code-block')}>
        <Code />
      </IconButton>
      <IconButton
        key="unordered-list-item"
        onClick={() => blockChangeButton('unordered-list-item')}
      >
        <FormatListBulleted />
      </IconButton>
      <IconButton key="ordered-list-item" onClick={() => blockChangeButton('ordered-list-item')}>
        <FormatListNumbered />
      </IconButton>
    </Fragment>
  )
}

export default BlockTagButtons
