// eslint-disable-next-line no-use-before-define
import React, { Fragment, useState } from 'react'
import { Box } from '@material-ui/core'
import { EditorState, RichUtils } from 'draft-js'

/**
 * Link
 */

type Props = {
  editorState: EditorState
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

const UrlComponent: React.FC<Props> = (props) => {
  const selection = props.editorState.getSelection()
  const contentState = props.editorState.getCurrentContent()
  const [showURLInput, setShowURLInput] = useState(false)
  const [urlValue, setUrlValue] = useState('')

  const onURLChange = (e: any) => setUrlValue(e.target.value)

  const promptForLink = (e: any) => {
    e.preventDefault()
    if (!selection.isCollapsed()) {
      const startKey = props.editorState.getSelection().getStartKey()
      const startOffset = props.editorState.getSelection().getStartOffset()
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
    const newEditorState = EditorState.set(props.editorState, {
      currentContent: contentStateWithEntity
    })
    props.setEditorState(
      RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey)
    )
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
      props.setEditorState(RichUtils.toggleLink(props.editorState, selection, null))
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
}

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
  link: {
    color: '#3b5998',
    textDecoration: 'underline'
  }
}

export default UrlComponent
