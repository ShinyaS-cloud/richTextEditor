import 'react-redux'
import { RawDraftContentState } from 'draft-js'

type MyState = {
  authReducer: {
    id: number
    googleId: string
    codename: string
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
      users: { id: number; codename: string }
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
        users: { id: number; codename: string }
      }
    ]
    loading: boolean
  }
  profileReducer: {
    id: number
    name: string
    introduction: string
    avatarUrl: string
    headerUrl: string
    usersId: number
    users: { codename: string }
  }
}
declare module 'react-redux' {
  // eslint-disable-next-line no-unused-vars
  interface DefaultRootState extends MyState {}
}
