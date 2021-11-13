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
  const rangeWidth = useRef<number>(0)

  const leftKnobDraggable = useRef<Draggable | null>(null)
  const rightKnobDraggable = useRef<Draggable | null>(null)

  const [leftVal, setLeftVal] = useState<number>(minPrice)
  const [rightVal, setRightVal] = useState<number>(maxPrice)

  // const [rangeWidth, setRangeWidth] = useState<number>(0)

  const dispatch = useDispatch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedPriceRange = useCallback(
    debounce((nextValue) => dispatch(setPriceRange(nextValue)), 200),
    []
  )

  const updateLeft = useCallback(() => {
    if (leftKnobDraggable.current) {
      const price =
        (leftKnobDraggable.current.x / rangeWidth.current) * maxPrice
      setLeftVal(price)
      debouncedPriceRange({ min: price, max: rightVal })
    }
  }, [debouncedPriceRange, rightVal, maxPrice])

  const updateRight = useCallback(() => {
    if (rightKnobDraggable.current) {
      const price =
        (rightKnobDraggable.current.x / rangeWidth.current) * maxPrice
      setRightVal(price)
      debouncedPriceRange({ min: leftVal, max: price })
    }
  }, [debouncedPriceRange, leftVal, maxPrice])

  const setWidth = () => {
    if (containerRef.current && rightKnob.current) {
      rangeWidth.current =
        containerRef.current.offsetWidth - rightKnob.current.offsetWidth
    }
  }

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

  const rightKnobScope = useCallback((vars: Draggable.Vars) => {
    const { maxX } = vars
    const resizedMax = rangeWidth.current || maxX

    if (leftKnobDraggable.current) {
      vars.applyBounds({
        minX: leftKnobDraggable.current.x,
        maxX: resizedMax,
        minY: 0,
        maxY: 0,
      })
    }
  }, [])

  const updateSlider = useCallback(() => {
    if (
      leftKnobDraggable.current &&
      rightKnobDraggable.current &&
      containerRef.current
    ) {
      gsap.set(leftKnobDraggable.current.target, {
        x: 0,
        onUpdate: () => {
          leftKnobDraggable.current?.update()
        },
      })

      gsap.set(rightKnobDraggable.current.target, {
        x: containerRef.current.offsetWidth,
        onUpdate: () => {
          rightKnobDraggable?.current?.update()
        },
      })
    }
  }, [])

  const handleResize = () => {
    setWidth()

    if (leftKnobDraggable.current && rightKnobDraggable.current) {
      const leftPos = (leftVal / maxPrice) * rangeWidth.current

      gsap.set(leftKnobDraggable.current.target, {
        x: leftPos,
      })

      const rightPos = (rightVal / maxPrice) * rangeWidth.current

      gsap.set(rightKnobDraggable.current.target, {
        x: rightPos,
      })

      leftKnobDraggable.current.kill()
      rightKnobDraggable.current.kill()

      initDraggable()
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedResize = debounce(handleResize, 200)

  useEffect(() => {
    if (window) {
      setWidth()
      window.addEventListener('resize', debouncedResize)
    }

    return () => window.removeEventListener('resize', debouncedResize)
  })

  const initDraggable = useCallback(() => {
    leftKnobDraggable.current = new Draggable(leftKnob.current, {
      type: 'x',
      bounds: containerRef.current,
      onDrag() {
        updateLeft()
      },
      onPress() {
        leftKnobScope(this)
      },
    })

    rightKnobDraggable.current = new Draggable(rightKnob.current, {
      type: 'x',
      bounds: containerRef.current,
      onDrag() {
        updateRight()
      },
      onPress() {
        rightKnobScope(this)
      },
    })
  }, [rightKnobScope, updateLeft, updateRight])

  useEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin, CSSRulePlugin)

    if (
      containerRef.current &&
      !leftKnobDraggable.current &&
      !rightKnobDraggable.current
    ) {
      initDraggable()
      updateSlider()
    }
  }, [updateSlider, initDraggable])

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
