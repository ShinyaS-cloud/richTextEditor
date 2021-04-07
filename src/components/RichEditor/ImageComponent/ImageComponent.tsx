// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
// import { EditorState, Modifier } from 'draft-js'
import { EditorState, RichUtils } from 'draft-js'
// import { AtomicBlockUtils, EditorState, RichUtils } from 'draft-js'

type Props = {
  editorState: EditorState
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

const ImageComponent: React.FC<Props> = (props) => {
  const classes = useStyles()

  const [showURLInputImage, setShowURLInputImage] = useState(false)
  const [urlValueImage, setUrlValueImage] = useState('')

  const onURLChange = (e: any) => setUrlValueImage(e.target.value)

  const confirmMedia = (e: any) => {
    e.preventDefault()
    const contentState = props.editorState.getCurrentContent()

    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', {
      src: urlValueImage
    })

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(props.editorState, {
      currentContent: contentStateWithEntity
    })
    props.setEditorState(
      RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey)
    )
    // const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

    // const newEditorState = EditorState.set(props.editorState, {
    //   currentContent: contentStateWithEntity
    // })

    // // The third parameter here is a space string, not an empty string
    // // If you set an empty string, you will get an error: Unknown DraftEntity key: null
    // props.setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))

    setShowURLInputImage(false)
    setUrlValueImage('')
  }

  const addImage = () => {
    setShowURLInputImage(true)
    setUrlValueImage('')
  }

  const onMediaInputKeyDown = (e: any) => {
    if (e.which === 13) {
      confirmMedia(e)
    }
  }

  let urlInput
  if (showURLInputImage) {
    urlInput = (
      <div className={classes.urlInputContainer}>
        <input
          onChange={onURLChange}
          className={classes.urlInput}
          type="text"
          value={urlValueImage}
          onKeyDown={onMediaInputKeyDown}
        />
        <button onMouseDown={confirmMedia}>Confirm</button>
      </div>
    )
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
