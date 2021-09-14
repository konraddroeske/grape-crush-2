import React, { FunctionComponent } from 'react'

import NextImage from 'next/image'

interface OwnProps {
  url: string
  title: string
}

type Props = OwnProps

const AmbassadorImage: FunctionComponent<Props> = ({ url, title }) => {
  // const [dimensions, setDimensions] = useState({
  //   height: 0,
  //   width: 0,
  // })

  // useEffect(() => {
  //   const img = new Image()
  //   img.addEventListener('load', getDimensions)
  //
  //   function getDimensions(this: HTMLImageElement) {
  //     const { naturalWidth, naturalHeight } = this
  //     setDimensions({
  //       height: naturalHeight,
  //       width: naturalWidth,
  //     })
  //   }
  //
  //   img.src = url
  //
  //   return () => img.removeEventListener('load', getDimensions)
  // }, [url])

  return (
    <div className="relative w-full h-full">
      <NextImage
        src={url}
        alt={title}
        // width={dimensions.width}
        // height={dimensions.height}
        className="mix-blend-multiply object-contain"
        layout="fill"
      />
    </div>
  )
}

export default AmbassadorImage
