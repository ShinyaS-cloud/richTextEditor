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
  }
  postReducer: {
    id: number
    title: string
    imageUrl: string
    category: number
    content: JSON
    userId: number
  }
}
declare module 'react-redux' {
  // eslint-disable-next-line no-unused-vars
  interface DefaultRootState extends MyState {}
}
