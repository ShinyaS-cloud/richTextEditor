// eslint-disable-next-line no-use-before-define
import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Divider, Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Create } from '@material-ui/icons'

interface Props {
  open: boolean
  openHandler: React.Dispatch<React.SetStateAction<boolean>>
}

const VerticalTabs: React.FC<Props> = (props) => {
  const classes = useStyles()

  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
      open={props.open}
      onClose={() => {
        props.openHandler(false)
      }}
    >
      <div className={classes.drawerContainer}>
        <List>
          <Divider />
          <ListItem button component='a' href="/api/newpost">
            <Create />
            <ListItemText primary="Rich Text Editor" onMouseDown={() => props.openHandler(false)} />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/signup">
            <ListItemText primary="Item Two" onMouseDown={() => props.openHandler(false)} />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/">
            <ListItemText primary="Item Three" onMouseDown={() => props.openHandler(false)} />
          </ListItem>
          <Divider />
        </List>
      </div>
    </Drawer>
  )
}
const drawerWidth = 180
const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    zIndex: 10
  },
  drawerContainer: {
    overflow: 'auto',
    color: 'white'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#734a3c'
  }
}))
export default VerticalTabs
