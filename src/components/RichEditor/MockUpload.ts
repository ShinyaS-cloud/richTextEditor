import { readFile } from '@draft-js-plugins/drag-n-drop-upload'

const mockUpload = (data: any, success: any, failed: any, progress: any) => {
  const doProgress = (percent: number) => {
    progress(percent || 1)
    if (percent === 100) {
      // Start reading the file
      Promise.all(data.files.map(readFile)).then((files) => success(files, { retainSrc: true }))
    } else {
      setTimeout(doProgress, 250, (percent || 0) + 10)
    }
  }

  doProgress(0)
}

export default mockUpload
