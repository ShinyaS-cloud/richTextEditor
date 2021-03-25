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
    isLoggedIn: false
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
    hasMore: boolean
    loading: boolean
  }
  userReducer: {
    id: number
    name: string
    introduction: string
    avatarUrl: string
    headerUrl: string
    codename: string
    isFollow: boolean
    toFollowCount: number
    fromFollowCount: number
  }
  followReducer: {
    id: number
    toFollow: { name: string; avatarUrl: string; introduction: string; codename: string }[]
    fromFollow: { name: string; avatarUrl: string; introduction: string; codename: string }[]
  }
  commentReducer: {
    comment: {
      id: number
      comment: string
      user: { name: string; codename: string; avatarUrl: string }
    }[]
    loading: boolean
  }
}
declare module 'react-redux' {
  // eslint-disable-next-line no-unused-vars
  interface DefaultRootState extends MyState {}
}
