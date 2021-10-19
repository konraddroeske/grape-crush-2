import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'

import { useInView } from 'react-intersection-observer'

import ContentfulImage from '@components/common/ContentfulImage'
import { Asset } from '@models/contentful-graph'

interface OwnProps {
  title: string
  description: string
  images: Asset[]
}

type Props = OwnProps

const SvgPopUp: FunctionComponent<Props> = ({ images, title, description }) => {
  const { ref, inView } = useInView({
    threshold: 0.75,
  })

  const [image1, image2, image3] = images
  const image1Ref = useRef<HTMLDivElement>(null)
  const image2Ref = useRef<HTMLDivElement>(null)
  const image3Ref = useRef<SVGImageElement>(null)

  useEffect(() => {
    if (image3Ref.current) {
      gsap.set(image3Ref.current, {
        y: '100%',
        x: '65%',
        rotate: '-6deg',
        opacity: 1,
      })
    }
  }, [])

  useEffect(() => {
    const duration = 0.6
    const ease = 1.5

    if (inView) {
      gsap.to(image1Ref.current, {
        y: '-70%',
        opacity: 1,
        duration,
        delay: 0.075,
        ease: `back.out(${ease})`,
      })

      gsap.to(image2Ref.current, {
        y: '-60%',
        opacity: 1,
        duration,
        ease: `back.out(${ease})`,
      })

      gsap.to(image3Ref.current, {
        y: '15%',
        x: '65%',
        opacity: 1,
        duration,
        delay: 0.1,
        ease: `back.out(${ease})`,
      })
    }
  }, [inView])

  return (
    <div ref={ref} className="relative w-full">
      <div
        ref={image1Ref}
        className="w-4/12 absolute top-1/2 left-0 transform rotate-12 translate-x-8 opacity-0"
      >
        <ContentfulImage image={image2} />
      </div>
      <div
        ref={image2Ref}
        className="w-4/12 absolute top-1/2 right-0 transform -rotate-12 -translate-x-4 opacity-0"
      >
        <ContentfulImage image={image3} />
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 630 626"
        className="w-full"
      >
        <title>{title}</title>
        <desc>{description}</desc>
        <defs>
          <clipPath id="maskBackground">
            <path
              id="clip-path-a"
              d="M599.786 221.558C604.924 200.664 602.015 178.598 591.638 159.755C581.261 140.911 564.177 126.672 543.788 119.872V119.872C532.075 115.974 521.345 109.58 512.339 101.13C503.332 92.6796 496.262 82.3743 491.616 70.9242V70.9242C483.52 51.0239 468.238 34.9046 448.812 25.7732C429.385 16.6417 407.238 15.1674 386.775 21.6434V21.6434C375.045 25.3524 362.655 26.4833 350.449 24.9592C338.243 23.435 326.509 19.2917 316.048 12.8119H315.84C297.594 1.5056 275.769 -2.51726 254.697 1.54192C233.626 5.60111 214.849 17.4456 202.095 34.7238V34.7238C194.774 44.6202 185.412 52.823 174.644 58.7747C163.876 64.7263 151.954 68.2875 139.69 69.2162V69.2162C118.3 70.8356 98.3004 80.4465 83.6579 96.1419C69.0154 111.837 60.8004 132.47 60.6422 153.948V153.948C60.5522 166.296 57.7948 178.48 52.5597 189.661C47.3245 200.842 39.7353 210.757 30.3129 218.725V218.725C13.9041 232.616 3.31739 252.181 0.657934 273.53C-2.00152 294.88 3.46127 316.449 15.9597 333.95V333.95C23.1468 343.992 28.0768 355.473 30.4109 367.605C32.745 379.736 32.4278 392.229 29.481 404.226V404.226C24.3351 425.126 27.2454 447.201 37.6321 466.047C48.0188 484.894 65.1185 499.129 85.5213 505.912V505.912C97.217 509.818 107.933 516.206 116.937 524.639C125.941 533.072 133.021 543.352 137.693 554.777V554.777C145.814 574.677 161.112 590.792 180.549 599.921C199.987 609.051 222.143 610.527 242.617 604.058V604.058C254.348 600.354 266.738 599.226 278.943 600.75C291.148 602.274 302.881 606.414 313.344 612.889C331.59 624.195 353.416 628.218 374.487 624.159C395.559 620.1 414.335 608.255 427.089 590.977V590.977C434.388 581.059 443.746 572.84 454.518 566.886C465.291 560.932 477.223 557.384 489.495 556.485V556.485C510.887 554.875 530.893 545.267 545.537 529.569C560.182 513.872 568.393 493.233 568.542 471.753V471.753C568.663 459.419 571.443 447.257 576.692 436.099C581.941 424.941 589.535 415.049 598.955 407.101V407.101C615.38 393.221 625.979 373.654 628.639 352.299C631.3 330.944 625.825 309.37 613.308 291.876V291.876C606.122 281.825 601.193 270.337 598.86 258.199C596.526 246.061 596.842 233.562 599.786 221.558V221.558Z"
            />
          </clipPath>
          <use fill="#DFFF85" fillRule="evenodd" xlinkHref="#clip-path-a" />
        </defs>
        <g clipPath="url(#maskBackground)">
          <path
            id="clip-path-a"
            d="M599.786 221.558C604.924 200.664 602.015 178.598 591.638 159.755C581.261 140.911 564.177 126.672 543.788 119.872V119.872C532.075 115.974 521.345 109.58 512.339 101.13C503.332 92.6796 496.262 82.3743 491.616 70.9242V70.9242C483.52 51.0239 468.238 34.9046 448.812 25.7732C429.385 16.6417 407.238 15.1674 386.775 21.6434V21.6434C375.045 25.3524 362.655 26.4833 350.449 24.9592C338.243 23.435 326.509 19.2917 316.048 12.8119H315.84C297.594 1.5056 275.769 -2.51726 254.697 1.54192C233.626 5.60111 214.849 17.4456 202.095 34.7238V34.7238C194.774 44.6202 185.412 52.823 174.644 58.7747C163.876 64.7263 151.954 68.2875 139.69 69.2162V69.2162C118.3 70.8356 98.3004 80.4465 83.6579 96.1419C69.0154 111.837 60.8004 132.47 60.6422 153.948V153.948C60.5522 166.296 57.7948 178.48 52.5597 189.661C47.3245 200.842 39.7353 210.757 30.3129 218.725V218.725C13.9041 232.616 3.31739 252.181 0.657934 273.53C-2.00152 294.88 3.46127 316.449 15.9597 333.95V333.95C23.1468 343.992 28.0768 355.473 30.4109 367.605C32.745 379.736 32.4278 392.229 29.481 404.226V404.226C24.3351 425.126 27.2454 447.201 37.6321 466.047C48.0188 484.894 65.1185 499.129 85.5213 505.912V505.912C97.217 509.818 107.933 516.206 116.937 524.639C125.941 533.072 133.021 543.352 137.693 554.777V554.777C145.814 574.677 161.112 590.792 180.549 599.921C199.987 609.051 222.143 610.527 242.617 604.058V604.058C254.348 600.354 266.738 599.226 278.943 600.75C291.148 602.274 302.881 606.414 313.344 612.889C331.59 624.195 353.416 628.218 374.487 624.159C395.559 620.1 414.335 608.255 427.089 590.977V590.977C434.388 581.059 443.746 572.84 454.518 566.886C465.291 560.932 477.223 557.384 489.495 556.485V556.485C510.887 554.875 530.893 545.267 545.537 529.569C560.182 513.872 568.393 493.233 568.542 471.753V471.753C568.663 459.419 571.443 447.257 576.692 436.099C581.941 424.941 589.535 415.049 598.955 407.101V407.101C615.38 393.221 625.979 373.654 628.639 352.299C631.3 330.944 625.825 309.37 613.308 291.876V291.876C606.122 281.825 601.193 270.337 598.86 258.199C596.526 246.061 596.842 233.562 599.786 221.558V221.558Z"
            fill="#DFFF85"
          />
          <image
            ref={image3Ref}
            className="w-5/12"
            fill="none"
            href={image1.url}
          />
        </g>
      </svg>
    </div>
  )
}

export default SvgPopUp
