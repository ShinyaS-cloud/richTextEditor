// eslint-disable-next-line no-use-before-define
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
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

import { RouteComponentProps, useLocation } from 'react-router-dom'
import { translateDate } from '../UtilComponent/articleUtils'
import axios from 'axios'
import { useTheme } from '@material-ui/core/styles'
import { HighlightOff } from '@material-ui/icons'

import EditorComponent from './ImageEditor.jsx'

type UserProps = RouteComponentProps<{
  articleId: string
}>

/**
 * ブロックの定義
 */

const RichEditor: React.FC<UserProps> = (props) => {
  /**
   * states
   */

  const location = useLocation()
  const pathname = location.pathname.split('/')
  const articleId = pathname[3]
  const codename = pathname[2]

  const classes = useStyle()

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  // const [editorState, setEditorState] = useState(EditorState.createEmpty(compositeDecorator))
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(0)
  const [abstract, setAbstract] = useState('')

  const [isPublic, setIsPublic] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [isUpLoading, setIsUpLoading] = useState(false)

  const refEditorState = useRef(editorState)
  const refTitle = useRef(title)
  const refCategory = useRef(category)
  const refAbstract = useRef(abstract)

  const refIsPublic = useRef(isPublic)

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
    setEditorState(EditorState.createWithContent(contentState))
    // setEditorState(EditorState.createWithContent(contentState, compositeDecorator))
    setCategory(article.category)
    setTitle(article.title)
    setAbstract(article.abstract)
    setIsPublic(article.isPublic)
  }
  useEffect(() => {
    fetchArticle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    refEditorState.current = editorState
    refCategory.current = category
    refTitle.current = title
    refAbstract.current = abstract

    refIsPublic.current = isPublic
  }, [abstract, category, editorState, isPublic, title])

  useEffect(() => {
    const save = async () => {
      const contentState = refEditorState.current.getCurrentContent()
      const content = convertToRaw(contentState)
      const saveContent = {
        data: {
          articleId: +articleId,
          title: refTitle.current,
          category: refCategory.current,
          abstract: refAbstract.current,

          isPublic: refIsPublic.current,
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
  const abstractChangeHandler = (e: any) => setAbstract(e.target.value)
  const isPublicChangeHandler = () => setIsPublic(!isPublic)

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
          </Box>
          <Box className={classes.dummyButtonContainer} />
        </Fragment>
      )
    }
  }

  return (
    <Box className={classes.root}>
      <ButtonColorLinks />

      <EditorComponent {...editorStateProps} readOnly={false} />

      <Box className={classes.formContainer}>
        <p>タイトル</p>
        <TextField className={classes.textItems} value={title} onChange={valueChangeHandler} />
        <p>概略</p>
        <TextField
          className={classes.textItems}
          value={abstract}
          onChange={abstractChangeHandler}
        />

        <p>カテゴリー</p>
        <FormControl className={classes.textItems}>
          <Select value={category} onChange={categoryChangeHandler}>
            {Selects}
          </Select>
        </FormControl>
        <Box className={classes.saveButton}>
          <Button
            variant="contained"
            color={isPublic ? 'secondary' : 'default'}
            onClick={isPublicChangeHandler}
          >
            公開
          </Button>
          <SaveButton
            editorState={editorState}
            title={title}
            category={category}
            abstract={abstract}
            isPublic={isPublic}
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
