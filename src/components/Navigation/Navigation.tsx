// eslint-disable-next-line no-use-before-define
import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Divider, Drawer, List, ListItem, ListItemText } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { Create } from '@material-ui/icons'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import articleReducer from '../../reducer/articleReducer'

interface Props {
  open: boolean
  openHandler: React.Dispatch<React.SetStateAction<boolean>>
}

const VerticalTabs: React.FC<Props> = (props) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const newArticleHandler = async () => {
    try {
      dispatch(articleReducer.actions.articleInit())
      const { data } = await axios.get('/api/newpost')
      const { articleId, codename } = data
      history.push('/edit/' + codename + '/' + articleId)
    } catch (err) {
      console.log(err)
    }
  }

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
          <ListItem button onClick={newArticleHandler}>
            <Create />
            <ListItemText primary="Rich Text Editor" onMouseDown={() => props.openHandler(false)} />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/signup">
            <ListItemText primary="Signup" onMouseDown={() => props.openHandler(false)} />
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/home">
            <ListItemText primary="Articles" onMouseDown={() => props.openHandler(false)} />
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
