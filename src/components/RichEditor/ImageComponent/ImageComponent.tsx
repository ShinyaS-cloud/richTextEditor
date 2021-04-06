// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Draft from 'draft-js'

const { AtomicBlockUtils, Editor, EditorState, convertToRaw } = Draft

const ImageComponent = () => {
  const classes = useStyles()

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [showURLInput, setShowURLInput] = useState(false)
  const [urlValue, setUrlValue] = useState('')
  const [urlType, setUrlType] = useState('')

  const logState = () => {
    const content = editorState.getCurrentContent()
    console.log(convertToRaw(content))
  }
  const onURLChange = (e: any) => setUrlValue(e.target.value)

  // const handleKeyCommand = (command: any, editorState: any) => {
  //   const newState = RichUtils.handleKeyCommand(editorState, command)
  //   if (newState) {
  //     setEditorState(newState)
  //     return true
  //   }
  //   return false
  // }

  const confirmMedia = (e: any) => {
    e.preventDefault()
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', {
      src: urlValue
    })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })

    // The third parameter here is a space string, not an empty string
    // If you set an empty string, you will get an error: Unknown DraftEntity key: null
    setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))
    setShowURLInput(false)
    setUrlValue('')
  }

  const onURLInputKeyDown = (e: any) => {
    if (e.which === 13) {
      confirmMedia(e)
    }
  }

  const promptForMedia = (type: any) => {
    setShowURLInput(true)
    setUrlValue('')
    setUrlType(type)
  }

  const addImage = () => {
    promptForMedia('image')
  }

  let urlInput
  if (showURLInput) {
    urlInput = (
      <div className={classes.urlInputContainer}>
        <input
          onChange={onURLChange}
          className={classes.urlInput}
          type="text"
          value={urlValue}
          onKeyDown={onURLInputKeyDown}
        />
        <button onMouseDown={confirmMedia}>Confirm</button>
      </div>
    )
  }
  const mediaBlockRenderer = (block: any) => {
    if (block.getType() === 'atomic') {
      return {
        component: Media,
        editable: false
      }
    }

    return null
  }

  const Image = (props: any) => {
    return <img src={props.src} className={classes.media} />
  }

  const Media = (props: any) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0))
    const { src } = entity.getData()
    // const type = entity.getType()

    const media = <Image src={src} />

    return media
  }

  return (
    <div className={classes.root}>
      <div className={classes.buttons}>Use the buttons to add audio, image, or video.</div>
      <div className={classes.buttons}>
        Here are some local examples that can be entered as a URL:
        <ul>
          <li>media.mp3</li>
          <li>media.png</li>
          <li>media.mp4</li>
        </ul>
      </div>
      <div className={classes.buttons}>
        <button onMouseDown={addImage} className={classes.button}>
          Add Image
        </button>
      </div>
      {urlInput}
      <div className={classes.editor} onClick={focus}>
        <Editor
          blockRendererFn={mediaBlockRenderer}
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Enter some text..."
        />
      </div>
      <input onClick={logState} className={classes.button} type="button" value="Log State" />
    </div>
  )
}

const useStyles = makeStyles({
  root: {
    fontFamily: "'Georgia', serif",
    padding: 20,
    width: 600
  },
  buttons: {
    marginBottom: 10
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
  button: {
    marginTop: 10,
    textAlign: 'center'
  },
  media: {
    width: '100%',
    // Fix an issue with Firefox rendering video controls
    // with 'pre-wrap' white-space
    whiteSpace: 'initial'
  }
})

export default ImageComponent
