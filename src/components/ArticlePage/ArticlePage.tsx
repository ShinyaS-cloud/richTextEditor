/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-use-before-define
import React, { Fragment, useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  makeStyles,
  Snackbar,
  Typography
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import {
  // CompositeDecorator,
  ContentBlock,
  convertFromRaw,
  DefaultDraftBlockRenderMap,
  DraftStyleMap,
  Editor,
  EditorState
} from 'draft-js'
import Immutable from 'immutable'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { red } from '@material-ui/core/colors'
import { translateDate, initialState } from '../UtilComponent/articleUtils'

import EditorComponent from '../RichEditor/ImageEditor'

import CommentList from './CommentList'

import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Alert } from '@material-ui/lab'

/**
 * custom block の定義
 */
const myCustomBlock = Immutable.Map({
  right: {
    element: 'div'
  },
  center: {
    element: 'div'
  },
  left: {
    element: 'div'
  }
})

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(myCustomBlock)

/**
 * functional component 部分
 */

const ArticlePage = () => {
  const classes = useStyle()
  const auth = useSelector((state) => state.authReducer)
  const history = useHistory()

  const location = useLocation()
  const pathname = location.pathname.split('/')
  const articleId = pathname[2]
  const codename = pathname[1]

  const [article, setArticle] = useState(initialState)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const {
    id,
    title,
    imageUrl,
    category,
    content,
    userId,
    createdAt,
    updatedAt,
    isFavorite,
    favoriteCount,
    isPublic,
    user
  } = article

  const [snackOpen, setSnackOpen] = useState(false)

  const fetch = async (articleId: number) => {
    try {
      const { data } = await axios.get('/api/article', {
        params: { id: articleId }
      })
      data.createdAt = translateDate(data.createdAt)
      data.updatedAt = translateDate(data.updatedAt)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const fetchArticle = async () => {
    const article = await fetch(+articleId)
    const contentState = convertFromRaw(article.content)
    setEditorState(EditorState.createWithContent(contentState))
    setArticle(article)
  }
  useEffect(() => {
    fetchArticle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editHandler = async () => {
    try {
      history.push('/edit/' + codename + '/' + articleId)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteHandler = async () => {
    try {
      const { data } = await axios.delete('/api/article/delete', {
        data: { articleId: +articleId }
      })
      if (data.authorizationRequired) {
        setSnackOpen(true)
        return
      } else {
        history.push('/' + codename)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const AvatarArea = (
    <a href={'/' + codename}>
      <Avatar
        aria-label="recipe"
        className={classes.avatar}
        src={process.env.PUBLIC_URL + '/' + user.avatarUrl}
      />
    </a>
  )
  const Action: any = (
    <IconButton aria-label="settings">
      <MoreVertIcon />
    </IconButton>
  )

  const EditButton: React.FC = () => {
    if (auth.id === userId) {
      return (
        <div>
          <Button onClick={editHandler} variant="contained" color="primary">
            編集
          </Button>
          <Button onClick={deleteHandler} variant="contained" color="primary">
            削除
          </Button>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackOpen(false)
  }
  const props = { editorState, setEditorState }

  const renderComponent = (
    <Fragment>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          不正な操作です
        </Alert>
      </Snackbar>
      <Box>
        <CardHeader
          className={classes.header}
          avatar={AvatarArea}
          action={Action}
          title={title}
          subheader={createdAt}
        />
        <Typography className={classes.title} variant="h3">
          {title}
        </Typography>

        <EditorComponent {...props} readOnly={true} />
        <div className={classes.button}>
          <EditButton />
        </div>
      </Box>
      <Box className={classes.comment}>
        <CommentList articleId={+articleId} />
      </Box>
    </Fragment>
  )

  return <div className={classes.root}>{renderComponent}</div>
}

const useStyle = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    marginBottom: theme.spacing(3)
  },
  header: {
    margin: '0 auto',
    backgroundColor: 'white',
    marginTop: theme.spacing(3),
    width: '65%',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '95%'
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      width: '80%'
    }
  },
  title: {
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: 'white',
    width: '65%',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '95%'
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      width: '80%'
    }
  },

  avatar: {
    backgroundColor: red[500]
  },
  button: {
    margin: '0 auto',
    textAlign: 'center'
  },
  comment: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0 auto',
    marginTop: theme.spacing(5),
    maxWidth: '80%'
  }
}))

export default ArticlePage
