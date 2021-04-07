// eslint-disable-next-line no-use-before-define
import React from 'react'

/**
 * Image
 */

export const findImageEntities = (contentBlock: any, callback: any, contentState: any) => {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity()
    console.log(entityKey)
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE'
  }, callback)
}

export const Image = (props: any) => {
  const { src } = props.contentState.getEntity(props.entityKey).getData()
  return <img src={src} style={styles.image} />
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
