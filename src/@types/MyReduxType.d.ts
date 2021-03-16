import 'react-redux'
import { RawDraftContentState } from 'draft-js'

type MyState = {
  authReducer: {
    id: number
    googleId: string
    name: string
    email: string
    loginGoogle: boolean
    password: string
    postId: number
    token: string
  }
  postReducer: {
    article: [
      {
        articleId: number
        title: string
        imageUrl: string
        category: number
        content: RawDraftContentState
        userName: string
        abstract: string
        createdAt: string
        updatedAt: string
      }
    ]
    loading: boolean
  }
}
declare module 'react-redux' {
  // eslint-disable-next-line no-unused-vars
  interface DefaultRootState extends MyState {}
}
