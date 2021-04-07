// eslint-disable-next-line no-use-before-define
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { EditorState, CompositeDecorator, convertToRaw, convertFromRaw } from 'draft-js'
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
import { Image, findImageEntities } from './Decorators/ImageDecorator'

import { RouteComponentProps, useLocation } from 'react-router-dom'
import { translateDate } from '../UtilComponent/articleUtils'
import axios from 'axios'
import { useTheme } from '@material-ui/core/styles'
import { HighlightOff } from '@material-ui/icons'
import ImageComponent from './ImageComponent/ImageComponent'
import UrlComponent from './ImageComponent/Link'
import EditorComponent from './EditorComponent'

type UserProps = RouteComponentProps<{
  articleId: string
}>

/**
 * ブロックの定義
 */

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
    },
    {
      strategy: findImageEntities,
      component: Image
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

  const refEditorState = useRef(editorState)
  const refTitle = useRef(title)
  const refCategory = useRef(category)

  /**
   * ここからarticleを非同期で持ってくる処理
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
   * Drawer
   */

  const theme = useTheme()

  const match = useMediaQuery(theme.breakpoints.between('md', 'xl'))
  const [open, setOpen] = useState(false)
  const toggleDrawer = () => {
    setOpen((b) => !b)
  }

  const editorStateProps = {
    editorState,
    setEditorState
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
              <StyleButtons {...editorStateProps} />
              <Divider />
              <BlockTagButtons {...editorStateProps} />
              <Divider />
              <ColorButtons {...editorStateProps} />
              <Divider />
              <UrlComponent {...editorStateProps} />
              <Divider />
              <ImageComponent {...editorStateProps} />
            </Paper>
          </Slide>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Box className={classes.buttonContainer}>
            <StyleButtons {...editorStateProps} />
            <Divider />
            <BlockTagButtons {...editorStateProps} />
            <Divider />
            <ColorButtons {...editorStateProps} />
            <Divider />
            <UrlComponent {...editorStateProps} />
            <Divider />
            <ImageComponent {...editorStateProps} />
          </Box>
          <Box className={classes.dummyButtonContainer} />
        </Fragment>
      )
    }
  }

  return (
    <Box className={classes.root}>
      <ButtonColorLinks />

      <EditorComponent {...editorStateProps} />

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
      </Box>
      <Box className={classes.dummyFormContainer} />
    </Box>
  )
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
  }
}))

export default RichEditor

/// onclickが重なってしまうので、onclickがある場所にボタンを配置しては行けない！！！
