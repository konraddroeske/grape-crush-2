import React, { FunctionComponent } from 'react'

import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'

import { BLOCKS, Document, MARKS } from '@contentful/rich-text-types'

interface OwnProps {
  richText: Document
}

type Props = OwnProps

const ContentfulRichText: FunctionComponent<Props> = ({ richText }) => {
  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <span className="bg-lime">{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="font-headline font-medium text-base text-blue-dark">
          {children}
        </p>
      ),
    },
  }

  return <div>{documentToReactComponents(richText, options)}</div>
}

export default ContentfulRichText
