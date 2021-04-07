// eslint-disable-next-line no-use-before-define
import React from 'react'
import { EditorState, RichUtils } from 'draft-js'
import { Box, IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core'
import {
  FormatQuote,
  FormatListBulleted,
  FormatListNumbered,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight
} from '@material-ui/icons'

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

const BlockTagButtons: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const classes = useStyles()
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

  return (
    <Box className={classes.root}>
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
      <IconButton key="blockquote" onMouseDown={(e) => blockChangeButton(e, 'blockquote')}>
        <FormatQuote />
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
    </Box>
  )
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  }
})

export default BlockTagButtons
