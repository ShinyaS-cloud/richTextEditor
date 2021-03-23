// eslint-disable-next-line no-use-before-define
import React, { useRef, useState } from 'react'
import {
  DefaultDraftBlockRenderMap,
  DraftStyleMap,
  Editor,
  EditorState,
  ContentBlock,
  CompositeDecorator,
  RichUtils
} from 'draft-js'
import { FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core'
import StyleButtons from './Buttons/StyleButtons'
import BlockTagButtons from './Buttons/BlockTagButtons'
import ColorButtons from './Buttons/ColorButtons'
import SaveButton from './Buttons/SaveButton'
import { handleStrategy, hashtagStrategy, HandleSpan, HashtagSpan } from './Decorators/HashTag'
import { Link, findLinkEntities } from './Decorators/LinkDecorator'
import Immutable from 'immutable'
import { RouteComponentProps } from 'react-router-dom'

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
  const classes = useStyle()
  const [editorState, setEditorState] = useState(EditorState.createEmpty(compositeDecorator))
  const [title, setTitle] = useState('')
  const [select, setSelect] = useState(0)
  const contentState = editorState.getCurrentContent()
  const selection = editorState.getSelection()

  const ref = useRef<Editor>(null)

  const valueChangeHandler = (e: any) => setTitle(e.target.value)
  const selectChangeHandler = (e: any) => setSelect(e.target.value)

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

  const categories = ['pet', 'sports', 'novel', 'IT', 'food']

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

  return (
    <div className={classes.root}>
      <div className={classes.text}>
        <p>タイトル</p>
        <TextField className={classes.textItems} value={title} onChange={valueChangeHandler} />
        <p>カテゴリー</p>
        <FormControl className={classes.textItems}>
          <InputLabel>カテゴリー</InputLabel>
          <Select value={select} onChange={selectChangeHandler}>
            {Selects}
          </Select>
        </FormControl>
      </div>

      <div className={classes.buttons}>
        <StyleButtons editorState={editorState} setEditorState={setEditorState} />
        <BlockTagButtons editorState={editorState} setEditorState={setEditorState} />
        <ColorButtons editorState={editorState} setEditorState={setEditorState} />
      </div>

      <div style={{ marginBottom: 10 }}>
        Select some text, then use the buttons to add or remove links on the selected text.
      </div>
      <div>
        <button onMouseDown={promptForLink} style={{ marginRight: 10 }}>
          Add Link
        </button>
        <button onMouseDown={removeLink}>Remove Link</button>
      </div>
      {urlInput}

      <div className={classes.editor} onClick={() => ref.current?.focus()}>
        <Editor
          customStyleMap={customStyleMap}
          editorState={editorState}
          onChange={setEditorState}
          blockRenderMap={extendedBlockRenderMap}
          blockStyleFn={myBlockStyleFn}
          ref={ref}
        />
      </div>

      <div className={classes.buttons}>
        <SaveButton
          editorState={editorState}
          title={title}
          category={select}
          articleId={props.match.params.articleId}
        />
      </div>
    </div>
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
/// style
const useStyle = makeStyles({
  root: {},
  buttons: {
    margin: '0 auto',
    textAlign: 'center'
  },
  editor: {
    width: '60%',
    backgroundColor: 'white',
    boxShadow: '0 1px 2px #eee',
    margin: '0 auto',
    minHeight: '50rem',
    padding: '3rem 2rem',
    fontSize: ' 18px ',
    cursor: 'text'
  },
  text: {
    textAlign: 'center'
  },
  textItems: {
    width: '60%'
  },
  title: {
    textAlign: 'center'
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
    fontFamily: "'Georgia', serif",
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
