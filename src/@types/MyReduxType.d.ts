import 'react-redux'
import { RawDraftContentState } from 'draft-js'

type MyState = {
  authReducer: {
    id: number
    googleId: string
    email: string
    loginGoogle: boolean
    password: string
  }
  articleReducer: {
    article: {
      id: number
      title: string
      imageUrl: string
      category: number
      content: RawDraftContentState
      userId: number
      abstract: string
      createdAt: string
      updatedAt: string
      user: { name: string; codename: string; avatarUrl: string }
    }
    loading: boolean
  }
  articleListReducer: {
    article: [
      {
        id: number
        title: string
        imageUrl: string
        category: number
        userId: number
        abstract: string
        createdAt: string
        updatedAt: string
        isFavorite: boolean
        user: { name: string; codename: string; avatarUrl: string }
      }
    ]
    loading: boolean
  }
  userReducer: {
    id: number
    name: string
    introduction: string
    avatarUrl: string
    headerUrl: string
    codename: string
  }
}
declare module 'react-redux' {
  // eslint-disable-next-line no-unused-vars
  interface DefaultRootState extends MyState {}
}
