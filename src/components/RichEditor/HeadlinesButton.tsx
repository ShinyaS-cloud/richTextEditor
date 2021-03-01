// eslint-disable-next-line no-use-before-define
import React from 'react'
import {
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton
} from '@draft-js-plugins/buttons'
import { Button, makeStyles, Menu, MenuItem } from '@material-ui/core'
import { ToolbarChildrenProps } from '@draft-js-plugins/static-toolbar/lib/components/Toolbar'

const HeadlinesButton: React.FC<React.PropsWithChildren<ToolbarChildrenProps>> = (props) => {
  const classes = useStyle()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.headlineButton}>
        H
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={classes.headlineButton}>
        <HeadlineOneButton {...props} />
        </MenuItem>

        <HeadlineTwoButton {...props} />

        <HeadlineThreeButton {...props} />
      </Menu>
    </div>
  )
}

const useStyle = makeStyles({
  headlineButtonWrapper: {
    display: 'inline-block'
  },
  headlineButton: {
    background: ' #fbfbfb',
    color: ' #888',
    fontSize: ' 18px',
    border: ' 0',
    paddingTop: ' 5px',
    verticalAlign: ' bottom',
    height: ' 34px',
    width: ' 36px',
    '&:hover,&:focus': {
      background: '#f3f3f3'
    }
  }
})

export default HeadlinesButton
