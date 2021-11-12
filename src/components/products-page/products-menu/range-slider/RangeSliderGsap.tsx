import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import gsap from 'gsap'

import { CSSRulePlugin } from 'gsap/dist/CSSRulePlugin'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin } from 'gsap/dist/InertiaPlugin'

import debounce from 'lodash.debounce'

import { useDispatch } from 'react-redux'

import { setPriceRange } from '@redux/productsSlice'

import s from './RangeSliderGsap.module.scss'

interface Props {
  minPrice: number
  maxPrice: number
}

const RangeSliderGsap: FunctionComponent<Props> = ({ minPrice, maxPrice }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const leftKnob = useRef<HTMLDivElement | null>(null)
  const rightKnob = useRef<HTMLDivElement | null>(null)

  const leftKnobDraggable = useRef<Draggable | null>(null)
  const rightKnobDraggable = useRef<Draggable | null>(null)

  const [leftVal, setLeftVal] = useState<number>(minPrice)
  const [rightVal, setRightVal] = useState<number>(maxPrice)

  const dispatch = useDispatch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedPriceRange = useCallback(
    debounce((nextValue) => dispatch(setPriceRange(nextValue)), 200),
    []
  )

  const updateLeft = useCallback(() => {
    const width = getWidth()
    if (leftKnobDraggable.current && width) {
      const price = (leftKnobDraggable.current.x / width) * maxPrice
      setLeftVal(price)
      debouncedPriceRange({ min: price, max: rightVal })
    }
  }, [debouncedPriceRange, rightVal, maxPrice])

  const updateRight = useCallback(() => {
    const width = getWidth()
    if (rightKnobDraggable.current && width) {
      const price = (rightKnobDraggable.current.x / width) * maxPrice
      setRightVal(price)
      debouncedPriceRange({ min: leftVal, max: price })
    }
  }, [debouncedPriceRange, leftVal, maxPrice])

  const leftKnobScope = (vars: Draggable.Vars) => {
    const { minX } = vars
    if (rightKnobDraggable.current) {
      vars.applyBounds({
        minX,
        maxX: rightKnobDraggable.current.x,
        minY: 0,
        maxY: 0,
      })
    }
  }

  const getWidth = () => {
    if (containerRef.current && rightKnob.current) {
      return containerRef.current.offsetWidth - rightKnob.current.offsetWidth
    }

    return null
  }

  const rightKnobScope = useCallback((vars: Draggable.Vars) => {
    const { maxX } = vars
    const resizedMax = getWidth() || maxX

    if (leftKnobDraggable.current) {
      vars.applyBounds({
        maxX: resizedMax,
        minY: 0,
        maxY: 0,
      })
    }
  }, [])

  const updateSlider = useCallback(() => {
    if (leftKnobDraggable.current && rightKnobDraggable.current) {
      gsap.set(leftKnobDraggable.current.target, {
        x: 0,
        onUpdate: () => {
          leftKnobDraggable.current?.update()
        },
      })

      gsap.set(rightKnobDraggable.current.target, {
        x: getWidth() || 0,
        onUpdate: () => {
          rightKnobDraggable?.current?.update()
        },
      })
    }
  }, [])

  const handleResize = () => {
    if (leftKnobDraggable.current && rightKnobDraggable.current) {
      const width = getWidth()

      if (width) {
        const leftPos = (leftVal / maxPrice) * width
        gsap.set(leftKnobDraggable.current.target, {
          x: leftPos,
        })

        const rightPos = (rightVal / maxPrice) * width
        gsap.set(rightKnobDraggable.current.target, {
          x: rightPos,
        })
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedResize = debounce(handleResize, 200)

  useEffect(() => {
    if (window) {
      handleResize()
      window.addEventListener('resize', debouncedResize)
    }

    return () => window.removeEventListener('resize', debouncedResize)
  })

  useEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin, CSSRulePlugin)

    if (
      containerRef.current &&
      !leftKnobDraggable.current &&
      !rightKnobDraggable.current
    ) {
      leftKnobDraggable.current = new Draggable(leftKnob.current, {
        type: 'x',
        bounds: containerRef.current,
        onDrag() {
          updateLeft()
          leftKnobScope(this)
        },
      })

      rightKnobDraggable.current = new Draggable(rightKnob.current, {
        type: 'x',
        bounds: containerRef.current,
        onDrag() {
          updateRight()
          rightKnobScope(this)
        },
      })

      updateSlider()
    }
  }, [updateSlider, updateLeft, updateRight, rightKnobScope])

  return (
    <div className="h-60">
      <div id="min">{leftVal}</div>
      <div id="max">{rightVal}</div>
      <div ref={containerRef} className={s.container} id="container">
        <div ref={leftKnob} className={`${s.knob} ${s.knob1}`} id="knob1" />
        <div ref={rightKnob} className={`${s.knob} ${s.knob2}`} id="knob2" />
      </div>
    </div>
  )
}

export default RangeSliderGsap
