// eslint-disable-next-line no-use-before-define
import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@material-ui/core'

const VerticalTabs = () => {
  const classes = useStyles()

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem button>
            <ListItemText primary="Item One" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Item Two" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Item Three" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  )
}
const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0
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
