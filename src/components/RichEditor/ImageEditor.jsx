// eslint-disable-next-line no-use-before-define
import React, { Fragment, useRef } from 'react'
import Editor, { composeDecorators } from '@draft-js-plugins/editor'
import { Box, makeStyles } from '@material-ui/core'
import { DefaultDraftBlockRenderMap } from 'draft-js'

import Immutable from 'immutable'
import createImagePlugin from '@draft-js-plugins/image'

import createAlignmentPlugin from '@draft-js-plugins/alignment'

import createFocusPlugin from '@draft-js-plugins/focus'

import createResizeablePlugin from '@draft-js-plugins/resizeable'

import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop'
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar'
import '@draft-js-plugins/inline-toolbar/lib/plugin.css'

import createDragNDropUploadPlugin from '@draft-js-plugins/drag-n-drop-upload'
import createLinkifyPlugin from '@draft-js-plugins/linkify'
import '@draft-js-plugins/linkify/lib/plugin.css'
import createHashtagPlugin from '@draft-js-plugins/hashtag'
import hashtag from './hashtag.module.css'
import StyleButtons from './Buttons/StyleButtons'
import mockUpload from './MockUpload'

const focusPlugin = createFocusPlugin()
const resizeablePlugin = createResizeablePlugin({})
const blockDndPlugin = createBlockDndPlugin()
const alignmentPlugin = createAlignmentPlugin()
const hashtagPlugin = createHashtagPlugin({ theme: hashtag })
const linkifyPlugin = createLinkifyPlugin()
const inlineToolbarPlugin = createInlineToolbarPlugin()

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
)
const imagePlugin = createImagePlugin({ decorator })

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage
})

const plugins = [
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  inlineToolbarPlugin,
  linkifyPlugin,
  hashtagPlugin
]

// The Editor accepts an array of plugins. In this case, only the imagePlugin
// is passed in, although it is possible to pass in multiple plugins.
const MyEditor = ({ editorState, setEditorState, readOnly }) => {
  const ref = useRef(null)
  const classes = useStyles()

  const { InlineToolbar } = inlineToolbarPlugin

  const myBlockStyleFn = (contentBlock) => {
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

  /**
   * ブロックの定義
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
  return (
    <Box className={classes.editor} onClick={() => ref.current?.focus()}>
      <Editor
        customStyleMap={customStyleMap}
        editorState={editorState}
        onChange={setEditorState}
        blockRenderMap={extendedBlockRenderMap}
        blockStyleFn={myBlockStyleFn}
        // blockRendererFn={mediaBlockRenderer}
        ref={(e) => (ref.current = e)}
        plugins={plugins}
        readOnly={readOnly}
      />
      <InlineToolbar>
        {
          // may be use React.Fragment instead of div to improve perfomance after React 16
          (externalProps) => (
            <Fragment>
              <StyleButtons
                {...externalProps}
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </Fragment>
          )
        }
      </InlineToolbar>
    </Box>
  )
}

/// customStyleMap
const customStyleMap = {
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

const useStyles = makeStyles((theme) => ({
  editor: {
    backgroundColor: 'white',
    boxShadow: '0 1px 2px #eee',
    margin: '0 auto',
    minHeight: '50rem',
    padding: '2rem 2rem',
    fontSize: ' 18px ',
    cursor: 'text',
    flex: '1',
    overflowY: 'auto',
    width: '65%',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '95%'
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      width: '80%'
    }
  },
  right: {
    textAlign: 'right'
  },
  center: {
    textAlign: 'center'
  },
  left: {
    textAlign: 'left'
  },
  image: {
    width: '100%',
    // Fix an issue with Firefox rendering video controls
    // with 'pre-wrap' white-space
    whiteSpace: 'initial'
  }
}))

// MyEditor.propTypes = {
//   editorState: PropTypes.EditorState,
//   setEditorState: PropTypes.React.Dispatch<React.SetStateAction<EditorState>>}

export default MyEditor
