import '@draft-js-plugins/drag-n-drop-upload'
import EditorState from 'draft-js'

type MyDndUploadPluginConfig = {
  handleUpload?(data: any, success: any, failed: any, progress: any): void
  addImage?(
    editorState: EditorState,
    placeholderSrc: string | ArrayBuffer | null,
    url: string,
    extraData: Record<string, unknown>
  ): EditorState
}

declare module '@draft-js-plugins/drag-n-drop-upload' {
  // eslint-disable-next-line no-unused-vars
  interface DndUploadPluginConfig extends MyDndUploadPluginConfig {}
}
