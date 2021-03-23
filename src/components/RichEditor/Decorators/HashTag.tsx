// eslint-disable-next-line no-use-before-define
import React from 'react'
import { ContentBlock, ContentState } from 'draft-js'
/**
 * ハッシュタグとユーザーハンドル
 */
// eslint-disable-next-line no-useless-escape
const HANDLE_REGEX = /\@[\w]+/g
// eslint-disable-next-line no-useless-escape
const HASHTAG_REGEX = /\#[\S]+/g

const findWithRegex = (regex: RegExp, contentBlock: ContentBlock, callback: any) => {
  const text = contentBlock.getText()
  let matchArr, start
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index
    callback(start, start + matchArr[0].length)
  }
}

export const handleStrategy = (
  contentBlock: ContentBlock,
  callback: any,
  contentState: ContentState
) => {
  findWithRegex(HANDLE_REGEX, contentBlock, callback)
}

export const hashtagStrategy = (
  contentBlock: ContentBlock,
  callback: any,
  contentState: ContentState
) => {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback)
}

export const HandleSpan = (props: any) => {
  return (
    <span style={styles.handle} data-offset-key={props.offsetKey}>
      {props.children}
    </span>
  )
}

export const HashtagSpan = (props: any) => {
  return (
    <span style={styles.hashtag} data-offset-key={props.offsetKey}>
      {props.children}
    </span>
  )
}
const styles = {
  handle: {
    color: 'rgba(98, 177, 254, 1.0)'
  },
  hashtag: {
    color: 'rgba(95, 184, 138, 1.0)'
  }
}
