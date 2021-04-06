// eslint-disable-next-line no-use-before-define
import React, { Fragment, useEffect, useRef, useState } from 'react'
import {
  DefaultDraftBlockRenderMap,
  DraftStyleMap,
  Editor,
  EditorState,
  ContentBlock,
  CompositeDecorator,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js'
import EditIcon from '@material-ui/icons/Edit'
import {
  Box,
  Button,
  Divider,
  Fab,
  FormControl,
  IconButton,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Slide,
  TextField,
  useMediaQuery
} from '@material-ui/core'
import StyleButtons from './Buttons/StyleButtons'
import BlockTagButtons from './Buttons/BlockTagButtons'
import ColorButtons from './Buttons/ColorButtons'
import SaveButton from './Buttons/SaveButton'
import { handleStrategy, hashtagStrategy, HandleSpan, HashtagSpan } from './Decorators/HashTag'
import { Link, findLinkEntities } from './Decorators/LinkDecorator'
import Immutable from 'immutable'
import { RouteComponentProps, useLocation } from 'react-router-dom'
import { translateDate } from '../UtilComponent/articleUtils'
import axios from 'axios'
import { useTheme } from '@material-ui/core/styles'
import { HighlightOff } from '@material-ui/icons'
import ImageComponent from './ImageComponent/ImageComponent'

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

type UserProps = RouteComponentProps<{
  articleId: string
}>

/**
 * paramsの型
 */

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(myCustomBlock)

const RichEditor: React.FC<UserProps> = (props) => {
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

  /**
   * states
   */

  const location = useLocation()
  const pathname = location.pathname.split('/')
  const articleId = pathname[3]
  const codename = pathname[2]

  const classes = useStyle()

  const [editorState, setEditorState] = useState(EditorState.createEmpty(compositeDecorator))
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(0)
  const contentState = editorState.getCurrentContent()

  const refEditorState = useRef(editorState)
  const refTitle = useRef(title)
  const refCategory = useRef(category)

  const selection = editorState.getSelection()

  const ref = useRef<Editor>(null)

  /**
   * ここからredux-toolkit使わないパターン
   */

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
    setCategory(article.category)
    setTitle(article.title)
  }
  useEffect(() => {
    fetchArticle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    refEditorState.current = editorState
    refCategory.current = category
    refTitle.current = title
  }, [category, editorState, title])

  useEffect(() => {
    const save = async () => {
      const contentState = refEditorState.current.getCurrentContent()
      const content = convertToRaw(contentState)
      const saveContent = {
        data: {
          articleId: +articleId,
          title: refTitle.current,
          category: refCategory.current,
          content: content
        }
      }
      console.log('save')

      try {
        await axios.post('/api/save', saveContent)
      } catch (error) {
        console.log(error)
      }
    }
    const saveTime = setInterval(() => {
      save()
    }, 5000)
    return () => {
      clearInterval(saveTime)
      save()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const valueChangeHandler = (e: any) => setTitle(e.target.value)
  const categoryChangeHandler = (e: any) => setCategory(e.target.value)

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

  const categories = ['ペット', 'スポーツ', '小説', 'IT', 'フード', '未分類']

  const Selects = categories.map((c) => {
    const index = categories.indexOf(c)
    return (
      <MenuItem key={index} value={index}>
        {c}
      </MenuItem>
    )
  })

  /**
   * Link
   */

  const [showURLInput, setShowURLInput] = useState(false)
  const [urlValue, setUrlValue] = useState('')

  const onURLChange = (e: any) => setUrlValue(e.target.value)

  const promptForLink = (e: any) => {
    e.preventDefault()
    if (!selection.isCollapsed()) {
      const startKey = editorState.getSelection().getStartKey()
      const startOffset = editorState.getSelection().getStartOffset()
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey)
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset)

      let url = ''
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey)
        url = linkInstance.getData().url
      }
      setShowURLInput(true)
      setUrlValue(url)
    }
  }

  const confirmLink = (e: any) => {
    e.preventDefault()

    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: urlValue })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey))
    setShowURLInput(false)
    setUrlValue('')
  }

  const onLinkInputKeyDown = (e: any) => {
    if (e.which === 13) {
      confirmLink(e)
    }
  }

  const removeLink = (e: any) => {
    e.preventDefault()
    if (!selection.isCollapsed()) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null))
    }
  }

  let urlInput
  if (showURLInput) {
    urlInput = (
      <div style={styles.urlInputContainer}>
        <input
          onChange={onURLChange}
          style={styles.urlInput}
          type="text"
          value={urlValue}
          onKeyDown={onLinkInputKeyDown}
        />
        <button onMouseDown={confirmLink}>Confirm</button>
      </div>
    )
  }

  const urlComponent = (
    <Fragment>
      <Box>
        <button onMouseDown={promptForLink} style={{ marginRight: 10 }}>
          Add Link
        </button>
        <button onMouseDown={removeLink}>Remove Link</button>
        {urlInput}
      </Box>
    </Fragment>
  )

  /**
   * Drawer
   */

  const theme = useTheme()

  const match = useMediaQuery(theme.breakpoints.between('md', 'xl'))
  const [open, setOpen] = useState(false)
  const toggleDrawer = () => {
    setOpen((b) => !b)
  }

  const ButtonColorLinks = () => {
    if (!match) {
      return (
        <Fragment>
          <Fab
            className={classes.floatButton}
            onMouseDown={toggleDrawer}
            color="secondary"
            aria-label="edit"
          >
            <EditIcon />
          </Fab>
          <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Paper className={classes.buttonCard}>
              <IconButton onMouseDown={toggleDrawer}>
                <HighlightOff />
              </IconButton>
              <StyleButtons editorState={editorState} setEditorState={setEditorState} />
              <Divider />
              <BlockTagButtons editorState={editorState} setEditorState={setEditorState} />
              <Divider />
              <ColorButtons editorState={editorState} setEditorState={setEditorState} />
              <Divider />
              {urlComponent}
            </Paper>
          </Slide>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Box className={classes.buttonContainer}>
            <StyleButtons editorState={editorState} setEditorState={setEditorState} />
            <Divider />
            <BlockTagButtons editorState={editorState} setEditorState={setEditorState} />
            <Divider />
            <ColorButtons editorState={editorState} setEditorState={setEditorState} />
            <Divider />
            {urlComponent}
          </Box>
          <Box className={classes.dummyButtonContainer} />
        </Fragment>
      )
    }
  }

  return (
    <Box className={classes.root}>
      <ButtonColorLinks />

      <Box className={classes.editor} onClick={() => ref.current?.focus()}>
        <Editor
          customStyleMap={customStyleMap}
          editorState={editorState}
          onChange={setEditorState}
          blockRenderMap={extendedBlockRenderMap}
          blockStyleFn={myBlockStyleFn}
          ref={ref}
        />
      </Box>

      <Box className={classes.formContainer}>
        <p>タイトル</p>
        <TextField className={classes.textItems} value={title} onChange={valueChangeHandler} />
        <p>カテゴリー</p>
        <FormControl className={classes.textItems}>
          <Select value={category} onChange={categoryChangeHandler}>
            {Selects}
          </Select>
        </FormControl>
        <Button>公開</Button>
        <Box className={classes.saveButton}>
          <SaveButton
            editorState={editorState}
            title={title}
            category={category}
            articleId={props.match.params.articleId}
            codename={codename}
          />
        </Box>
        <Box>
          <ImageComponent />
        </Box>
      </Box>
      <Box className={classes.dummyFormContainer} />
    </Box>
  )
}

/// customStyleMap
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

const buttonContainerWidth = '15%'
const formContainerWidth = '20%'
/// style
const useStyle = makeStyles((theme) => ({
  root: { display: 'flex' },
  floatButton: {
    position: 'fixed'
  },
  buttonContainer: {
    padding: '0 1rem',
    width: buttonContainerWidth,
    position: 'fixed'
  },
  dummyButtonContainer: {
    flexBasis: buttonContainerWidth,
    [theme.breakpoints.between('xs', 'sm')]: {
      flexBasis: '0%'
    }
  },
  buttonCard: {
    position: 'fixed',
    bottom: theme.spacing(2)
  },
  formContainer: { padding: '0 1rem', width: formContainerWidth, position: 'fixed', right: 0 },
  dummyFormContainer: { flexBasis: formContainerWidth },
  editor: {
    backgroundColor: 'white',
    boxShadow: '0 1px 2px #eee',
    margin: '0 auto',
    minHeight: '50rem',
    maxWidth: '65%',
    padding: '2rem 2rem',
    fontSize: ' 18px ',
    cursor: 'text',
    flex: '1',
    overflowY: 'auto',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '95%'
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      width: '80%'
    }
  },
  text: {
    textAlign: 'center'
  },
  textItems: {
    width: '100%'
  },
  title: {
    textAlign: 'center'
  },
  saveButton: {
    textAlign: 'center',
    marginTop: '2rem'
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

const styles = {
  handle: {
    color: 'rgba(98, 177, 254, 1.0)'
  },
  hashtag: {
    color: 'rgba(95, 184, 138, 1.0)'
  },
  urlInputContainer: {
    marginBottom: 10
  },
  urlInput: {
    marginRight: 10,
    padding: 3
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10
  },
  link: {
    color: '#3b5998',
    textDecoration: 'underline'
  }
}

export default RichEditor

/// onclickが重なってしまうので、onclickがある場所にボタンを配置しては行けない！！！
