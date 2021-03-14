import 'react-redux'

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
        content: JSON
        userId: number
        createdAt: string
        updatedAt: string
      }
    ]
  }
}
declare module 'react-redux' {
  // eslint-disable-next-line no-unused-vars
  interface DefaultRootState extends MyState {}
}
