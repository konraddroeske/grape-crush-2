import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import debounce from 'lodash.debounce'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { setPriceRange } from '@redux/productsSlice'

import s from './RangeSlider.module.scss'

interface OwnProps {
  min: number
  max: number
}

type Props = OwnProps

const RangeSlider: FunctionComponent<Props> = ({ min, max }) => {
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)
  const minValRef = useRef<HTMLInputElement | null>(null)
  const maxValRef = useRef<HTMLInputElement | null>(null)
  const range = useRef<HTMLDivElement | null>(null)

  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (router.asPath === '/products' || router.asPath === '/products?page=1') {
      setMinVal(0)
      setMaxVal(max)
      dispatch(setPriceRange({ min: 0, max }))
    }
  }, [dispatch, router, max])

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal)
      const maxPercent = getPercent(+maxValRef.current.value) // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`
        range.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [minVal, getPercent])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value)
      const maxPercent = getPercent(maxVal)

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [maxVal, getPercent])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedPriceRange = useCallback(
    debounce((nextValue) => dispatch(setPriceRange(nextValue)), 200),
    []
  )

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinVal = Math.min(
      Math.floor(+event.target.value / 100) * 100,
      maxVal - 1000
    )
    setMinVal(newMinVal)
    debouncedPriceRange({ min: newMinVal, max: maxVal })
  }

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxVal = Math.max(
      Math.ceil(+event.target.value / 100) * 100,
      minVal + 1000
    )
    setMaxVal(newMaxVal)
    debouncedPriceRange({ min: minVal, max: newMaxVal })
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <div className={`${s.sliderLeftValue} text-blue-dark text-sm`}>
          ${minVal / 100}
        </div>
        <div className={`${s.sliderRightValue} text-blue-dark text-sm`}>
          ${maxVal / 100}
        </div>
      </div>
      <div className={s.container}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={handleMinChange}
          className={`${s.thumb} ${s.thumbZIndex3} ${
            minVal > max - 100 ? s.thumbZIndex5 : ''
          }`}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={handleMaxChange}
          className={`${s.thumb} ${s.thumbZIndex4}`}
        />

        <div className={s.slider}>
          <div className={s.sliderTrack} />
          <div ref={range} className={s.sliderRange} />
        </div>
      </div>
    </div>
  )
}

export default RangeSlider
