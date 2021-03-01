import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Draft, { EditorState, ContentState, convertToRaw } from 'draft-js'

const initialState = { contentState: convertToRaw(ContentState.createFromText('')) }
export const contentToEditor = (content: ContentState) => {
  return EditorState.createWithContent(content)
}
export const editorToContent = (editor: EditorState) => {
  return editor.getCurrentContent()
}
const buttonReducer = createSlice({
  name: 'buttonStore',
  initialState: initialState,
  reducers: {
    newEditorState: (state, action: PayloadAction<Draft.RawDraftContentState>) => ({
      ...state,
      contentState: action.payload
    })
  }
})

export default buttonReducer
