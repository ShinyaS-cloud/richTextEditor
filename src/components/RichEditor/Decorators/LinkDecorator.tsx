// eslint-disable-next-line no-use-before-define
import React from 'react'

/**
 * Link
 */

export const findLinkEntities = (contentBlock: any, callback: any, contentState: any) => {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity()
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
  }, callback)
}

export const Link = (props: any) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData()
  return (
    <a href={url} style={styles.link}>
      {props.children}
    </a>
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
  link: {
    color: '#3b5998',
    textDecoration: 'underline'
  }
}
