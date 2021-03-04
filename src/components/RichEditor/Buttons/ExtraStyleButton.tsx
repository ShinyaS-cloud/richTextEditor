// eslint-disable-next-line no-use-before-define
// eslint-disable-next-line no-unused-vars
import React from 'react'
// import Draft, { ContentBlock } from 'draft-js'
// import Immutable from 'immutable'

// const myCustomBlock = Immutable.Map({
//   right: {
//     element: 'div'
//   },
//   center: {
//     element: 'div'
//   },
//   left: {
//     element: 'div'
//   }
// })

// export const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(myCustomBlock)

// export const myBlockStyleFn = (contentBlock: ContentBlock) => {
//   const type = contentBlock.getType()
//   switch (type) {
//     case 'right':
//       return type
//     case 'center':
//       return type
//     case 'left':
//       return type
//     default:
//       return type
//   }
// }

// // type textPosition = { type: 'right' | 'center' | 'left' }

// // const blockRender = (contentBlock: ContentBlock) => {
// //   const type = contentBlock.getType()

// //   switch (type) {
// //     case 'right':
// //       return {
// //         component: ExtraStyleButton,
// //         props: { type: type }
// //       }
// //     case 'center':
// //       return {
// //         component: ExtraStyleButton,
// //         props: { type: type }
// //       }
// //     case 'left':
// //       return {
// //         component: ExtraStyleButton,
// //         props: { type: type }
// //       }
// //     default:
// //       break
// //   }
// // }

// // type Props = {
// //   block: ContentBlock
// //   contentState: ContentState
// //   blockProps: textPosition
// // }

// // export const ExtraStyleButton: React.FC<Props> = (props) => {
// //   const classes = useStyle()
// //   console.log(props)
// //   const { block } = props
// //   const { type } = props.blockProps
// //   const text = block.getText()
// //   const className = classes[type]
// //   return <div className={className}>{text}</div>
// // }

// // const useStyle = makeStyles({
// //   right: {
// //     textAlign: 'right'
// //   },
// //   center: {
// //     textAlign: 'center'
// //   },
// //   left: {
// //     textAlign: 'left'
// //   }
// // })

// // export default blockRender
