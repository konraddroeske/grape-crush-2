import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import debounce from 'lodash.debounce'
import { useDispatch, useSelector } from 'react-redux'

import { remToPixels } from '@lib/remToPixels'
import { selectProducts, setPriceRange } from '@redux/productsSlice'

import s from './RangeSlider.module.scss'

interface OwnProps {
  min: number
  max: number
}

type Props = OwnProps

const RangeSlider: FunctionComponent<Props> = ({ min, max }) => {
  const { priceRange } = useSelector(selectProducts())
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)
  const minValRef = useRef<HTMLInputElement | null>(null)
  const maxValRef = useRef<HTMLInputElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const range = useRef<HTMLDivElement | null>(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (priceRange.max) {
      setMinVal(priceRange.min)
      setMaxVal(priceRange.max)
    }
  }, [priceRange])

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  const [minDistance, setMinDistance] = useState<number>(0)

  const handleResize = useCallback(() => {
    const buttonWidth = remToPixels(1.75)
    const rangeWidth = containerRef.current?.offsetWidth

    if (rangeWidth) {
      const distance = (buttonWidth / rangeWidth) * max
      setMinDistance(Math.ceil(distance / 100) * 100)
    }
  }, [max])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedResize = useCallback(debounce(handleResize, 200), [])

  useEffect(() => {
    if (window) {
      debouncedResize()
      window.addEventListener('resize', debouncedResize)
    }

    return () => window.removeEventListener('resize', debouncedResize)
  }, [debouncedResize])

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
      maxVal - minDistance
    )
    setMinVal(newMinVal)
    debouncedPriceRange({ min: newMinVal, max: maxVal })
  }

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxVal = Math.max(
      Math.ceil(+event.target.value / 100) * 100,
      minVal + minDistance
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
      <div ref={containerRef} className={s.container}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={handleMinChange}
          className={`${s.thumb} ${s.thumbZIndex3}`}
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
