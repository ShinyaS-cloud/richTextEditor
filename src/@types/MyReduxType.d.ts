import 'react-redux'
import { RawDraftContentState } from 'draft-js'

type MyState = {
  authReducer: {
    id: number
    authUserId: number
    name: string
    introduction: string
    avatarUrl: string
    headerUrl: string
    codename: string
    isLogedIn: false
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
      isFavorite: boolean
      favoriteCount: number
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
        favoriteCount: number
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
