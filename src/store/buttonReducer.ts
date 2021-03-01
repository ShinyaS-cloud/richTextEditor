import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Draft, { EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw } from 'draft-js'

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
    }),
    inlineChangeButton: (state, action: PayloadAction<string>) => ({
      ...state,
      editorState: convertToRaw(
        editorToContent(
          RichUtils.toggleInlineStyle(
            contentToEditor(convertFromRaw(state.contentState)),
            action.payload
          )
        )
      )
    })
  }
})

export default buttonReducer
