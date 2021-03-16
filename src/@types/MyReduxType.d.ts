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
        id: number
        title: string
        imageUrl: string
        category: number
        content: RawDraftContentState
        userId: number
        abstract: string
        createdAt: string
        updatedAt: string
        users: { id: number; name: string }
      }
    ]
    loading: boolean
  }
}
declare module 'react-redux' {
  // eslint-disable-next-line no-unused-vars
  interface DefaultRootState extends MyState {}
}
