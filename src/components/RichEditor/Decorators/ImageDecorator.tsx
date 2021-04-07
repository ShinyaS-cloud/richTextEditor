// eslint-disable-next-line no-use-before-define
import React from 'react'
import { ContentBlock, ContentState } from 'draft-js'

/**
 * Image
 */

export const findImageEntities = (
  contentBlock: ContentBlock,
  callback: any,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity()
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE'
  }, callback)
}

export const Image = (props: any) => {
  const { src } = props.contentState.getEntity(props.entityKey).getData()
  return (
    <div>
      <p> </p>
      <img src={src} style={styles.image} />
      <p> </p>
    </div>
  )
}

const styles = {
  urlInputContainer: {
    marginBottom: 10
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3
  },
  image: {
    width: '100%'
  }
}
