// eslint-disable-next-line no-use-before-define
import React, { useCallback, useEffect, useState } from 'react'
import {
  Avatar,
  CardHeader,
  CircularProgress,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
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
import { fetchArticle } from '../../reducer/postReducer'
import { useParams } from 'react-router'

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
 * fanctional component 部分
 */

const ArticlePage = () => {
  const classes = useStyle()
  const dispatch = useDispatch()
  const { articleId } = useParams<{ articleId: string }>()
  const fetchedArticle = useSelector((state) => state.postReducer.article)
  const loading = useSelector((state) => state.postReducer.loading)

  const article = fetchedArticle[0]
  const contentState = convertFromRaw(article.content)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const changeStateHandler = useCallback(() => {
    setEditorState(EditorState.createWithContent(contentState))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(fetchArticle(+articleId))
    changeStateHandler()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId, dispatch])

  console.log('articleId', articleId)
  console.log('fetchedArticle', fetchedArticle)

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

  const AvaterArea = (
    <Avatar aria-label="recipe" className={classes.avatar}>
      {article.users.name}
    </Avatar>
  )
  const Action: any = (
    <IconButton aria-label="settings">
      <MoreVertIcon />
    </IconButton>
  )

  const Title: any = article.title

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

  let renderComponent = (
    <div className={classes.editor}>
      <CardHeader avatar={AvaterArea} action={Action} title={Title} subheader={article.createdAt} />
      <Typography variant="h3">{Title}</Typography>
      <div className={classes.editor}>{EditorComponent}</div>
    </div>
  )
  if (loading) {
    renderComponent = (
      <div className={classes.circular}>
        <CircularProgress size="5rem" />
      </div>
    )
  }

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

const useStyle = makeStyles({
  root: {
    backgroundColor: '#f2ecd8',
    backgroundAttachment: 'fixed',
    margin: '0 auto',
    width: '100%',
    overflowY: 'scroll',
    height: '100%'
  },
  editor: {
    width: '80%',
    backgroundColor: 'white',
    boxShadow: '0 1px 2px #eee',
    margin: '0 auto',
    marginBottom: '5rem',
    minHeight: '30rem',
    padding: '1rem 1rem',
    fontSize: ' 18px ',
    cursor: 'text'
  },
  avatar: {
    backgroundColor: red[500]
  },
  circular: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100px'
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
})

export default ArticlePage
