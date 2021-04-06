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
  CompositeDecorator,
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

import {
  handleStrategy,
  hashtagStrategy,
  HandleSpan,
  HashtagSpan
} from '../RichEditor/Decorators/HashTag'

import { Link, findLinkEntities } from '../RichEditor/Decorators/LinkDecorator'

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
  const compositeDecorator = new CompositeDecorator([
    {
      strategy: handleStrategy,
      component: HandleSpan
    },
    {
      strategy: hashtagStrategy,
      component: HashtagSpan
    },
    {
      strategy: findLinkEntities,
      component: Link
    }
  ])

  const classes = useStyle()
  const auth = useSelector((state) => state.authReducer)
  const history = useHistory()

  const location = useLocation()
  const pathname = location.pathname.split('/')
  const articleId = pathname[2]
  const codename = pathname[1]

  const [article, setArticle] = useState(initialState)
  const [editorState, setEditorState] = useState(EditorState.createEmpty(compositeDecorator))
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
    setEditorState(EditorState.createWithContent(contentState, compositeDecorator))
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

  const myBlockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType()
    switch (type) {
      case 'right':
        return classes[type]
      case 'center':
        return classes[type]
      case 'left':
        return classes[type]
      default:
        return type
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

  const EditorComponent: any = (
    <Editor
      customStyleMap={customStyleMap}
      editorState={editorState}
      onChange={setEditorState}
      blockRenderMap={extendedBlockRenderMap}
      blockStyleFn={myBlockStyleFn}
      readOnly={true}
    />
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

  const renderComponent = (
    <Fragment>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          不正な操作です
        </Alert>
      </Snackbar>
      <Box>
        <Card className={classes.editor}>
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
          {EditorComponent}
        </Card>
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

/**
 * customStyleMap
 */
const customStyleMap: DraftStyleMap = {
  red: {
    color: 'rgba(255, 0, 0, 1.0)'
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)'
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)'
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)'
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)'
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)'
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)'
  }
}

const useStyle = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    marginBottom: theme.spacing(3)
  },
  header: {
    margin: '0 auto',
    backgroundColor: 'white'
  },
  title: {
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: 'white'
  },
  editor: {
    width: '60%',
    boxShadow: '0 1px 2px #eee',
    margin: '0 auto',
    marginTop: theme.spacing(1),
    minHeight: '50rem',
    padding: '3rem 2rem',
    fontSize: ' 18px ',
    cursor: 'text',
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
    marginTop: theme.spacing(5)
  },
  circular: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(1)
  },
  right: {
    textAlign: 'right'
  },
  center: {
    textAlign: 'center'
  },
  left: {
    textAlign: 'left'
  }
}))

export default ArticlePage
