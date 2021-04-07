// eslint-disable-next-line no-use-before-define
import React, { useRef } from 'react'
// import React, { useMemo, useRef } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import {
  DefaultDraftBlockRenderMap,
  DraftStyleMap,
  Editor,
  ContentBlock,
  EditorState
} from 'draft-js'

import Immutable from 'immutable'

type Props = {
  editorState: EditorState
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

const EditorComponent: React.FC<Props> = (props) => {
  const classes = useStyles()
  const ref = useRef<Editor>(null)
  // const srcMap: any = []
  // const editorState = props.editorState
  // const entityKey = props.editorState.getCurrentContent().getLastCreatedEntityKey()

  /**
   * Mediaの処理
   */

  // const Media = (props: any) => {
  //   console.log(props.block.toJS())
  //   const entityKey = props.block.toJS().characterList[0].entity

  //   console.log(entityKey)

  //   const entity = props.contentState.getEntity(entityKey)
  //   const { src } = entity.getData()
  //   const media = <img src={src} className={classes.image} />
  //   return media

  //   // const { src } = editorState.getCurrentContent().getEntity(entityKey).getData()
  //   // console.log(src)
  //   // const media = <img src={src} className={classes.image} />
  // }

  // const mediaBlockRenderer = (block: any) => {
  //   if (block.getType() === 'atomic') {
  //     return {
  //       component: Media,
  //       editable: false
  //     }
  //   }

  //   return null
  // }

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
        editorState={props.editorState}
        onChange={props.setEditorState}
        blockRenderMap={extendedBlockRenderMap}
        blockStyleFn={myBlockStyleFn}
        // blockRendererFn={mediaBlockRenderer}
        ref={ref}
      />
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

const useStyles = makeStyles((theme) => ({
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

export default EditorComponent
