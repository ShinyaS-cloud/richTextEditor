import 'react-redux'

type MyState = {
  authReducer: {
    googleId: string
    __v: number
    _id: string
    credits: number
  }
}
declare module 'react-redux' {
  // eslint-disable-next-line no-unused-vars
  interface DefaultRootState extends MyState {}
}
