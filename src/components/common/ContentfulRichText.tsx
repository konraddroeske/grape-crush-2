import React, { FunctionComponent } from 'react'

import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'

import { Document } from '@contentful/rich-text-types'

interface OwnProps {
  richText: Document
  options: Options
}

type Props = OwnProps

const ContentfulRichText: FunctionComponent<Props> = ({
  richText,
  options,
}) => {
  return <div>{documentToReactComponents(richText, options)}</div>
}

export default ContentfulRichText
