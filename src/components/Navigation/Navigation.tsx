// eslint-disable-next-line no-use-before-define
import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@material-ui/core'
import { Link } from 'react-router-dom'

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
      variant="persistent"
      open={props.open}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Item One" onMouseDown={() => props.openHandler(!props.open)} />
          </ListItem>
          <ListItem button component={Link} to="/signup">
            <ListItemText primary="Item Two" onMouseDown={() => props.openHandler(!props.open)}/>
          </ListItem>
          <ListItem button component={Link} to="/posts">
            <ListItemText primary="Item Three" onMouseDown={() => props.openHandler(!props.open)}/>
          </ListItem>
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
