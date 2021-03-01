import 'react-redux'
import Draft from 'draft-js'
type MyState = {
  buttonReducer: {
    contentState: Draft.RawDraftContentState
  }
}
declare module 'react-redux' {
  // eslint-disable-next-line no-unused-vars
  interface DefaultRootState extends MyState {}
}
// 必ずsrc以下に入れること
