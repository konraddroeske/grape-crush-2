import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import useResizeObserver from '@react-hook/resize-observer'
import gsap from 'gsap'

import { CSSRulePlugin } from 'gsap/dist/CSSRulePlugin'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin } from 'gsap/dist/InertiaPlugin'

import debounce from 'lodash.debounce'

import { useDispatch, useSelector } from 'react-redux'

import { remToPixels } from '@lib/remToPixels'
import {
  selectProducts,
  setPriceRangeMin,
  setPriceRangeMax,
} from '@redux/productsSlice'

import s from './RangeSliderGsap.module.scss'

interface Props {
  minPrice: number
  maxPrice: number
}

const RangeSliderGsap: FunctionComponent<Props> = ({ minPrice, maxPrice }) => {
  const dispatch = useDispatch()
  const { priceRangeMin, priceRangeMax } = useSelector(selectProducts())

  const containerRef = useRef<HTMLDivElement | null>(null)
  const rangeRef = useRef<HTMLDivElement | null>(null)
  const leftKnob = useRef<HTMLDivElement | null>(null)
  const rightKnob = useRef<HTMLDivElement | null>(null)

  const rangeWidth = useRef<number>(0)

  const leftKnobDraggable = useRef<Draggable | null>(null)
  const rightKnobDraggable = useRef<Draggable | null>(null)

  const [leftVal, setLeftVal] = useState<number>(minPrice)
  const [rightVal, setRightVal] = useState<number>(maxPrice)

  useEffect(() => {
    if (priceRangeMax) {
      setLeftVal(priceRangeMin)
      setRightVal(priceRangeMax)
    }
  }, [priceRangeMax, priceRangeMin])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedPriceRangeMin = useCallback(
    debounce((nextValue) => dispatch(setPriceRangeMin(nextValue)), 200),
    []
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedPriceRangeMax = useCallback(
    debounce((nextValue) => dispatch(setPriceRangeMax(nextValue)), 200),
    []
  )

  const updateLeft = useCallback(() => {
    if (leftKnobDraggable.current) {
      const price =
        (leftKnobDraggable.current.x / rangeWidth.current) * maxPrice

      setLeftVal(price)

      gsap.set(rangeRef.current, {
        left: leftKnobDraggable.current.x,
      })

      debouncedPriceRangeMin(price)
    }
  }, [debouncedPriceRangeMin, maxPrice])

  const updateRight = useCallback(() => {
    if (rightKnobDraggable.current) {
      const price =
        (rightKnobDraggable.current.x / rangeWidth.current) * maxPrice

      setRightVal(price)

      gsap.set(rangeRef.current, {
        right: `calc(100% - ${rightKnobDraggable.current.x}px)`,
      })

      debouncedPriceRangeMax(price)
    }
  }, [debouncedPriceRangeMax, maxPrice])

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
        maxX: rightKnobDraggable.current.x - remToPixels(1.95),
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
        minX: leftKnobDraggable.current.x + remToPixels(1.95),
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
      setWidth()

      const leftX = (priceRangeMin / maxPrice) * rangeWidth.current
      const rightX =
        ((priceRangeMax || maxPrice) / maxPrice) * rangeWidth.current

      gsap.set(leftKnobDraggable.current.target, {
        x: leftX,
        y: '-50%',
        onUpdate: () => {
          leftKnobDraggable.current?.update()
        },
      })

      gsap.set(rightKnobDraggable.current.target, {
        x: rightX,
        y: '-50%',
        onUpdate: () => {
          rightKnobDraggable?.current?.update()
        },
      })
    }
  }, [maxPrice, priceRangeMax, priceRangeMin])

  const handleResize = () => {
    setWidth()

    if (leftKnobDraggable.current && rightKnobDraggable.current) {
      const leftPos = (leftVal / maxPrice) * rangeWidth.current

      gsap.set(leftKnobDraggable.current.target, {
        x: leftPos,
        y: '-50%',
      })

      const rightPos = (rightVal / maxPrice) * rangeWidth.current

      gsap.set(rightKnobDraggable.current.target, {
        x: rightPos,
        y: '-50%',
      })

      gsap.set(rangeRef.current, {
        left: leftPos,
        right: `calc(100% - ${rightPos}px)`,
      })

      leftKnobDraggable.current.kill()
      rightKnobDraggable.current.kill()

      initDraggable()
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedResize = debounce(handleResize, 50)

  useResizeObserver(containerRef, debouncedResize)

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
      !rightKnobDraggable.current &&
      leftKnob.current &&
      rightKnob.current
    ) {
      initDraggable()
      updateSlider()
    }
  }, [updateSlider, initDraggable])

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        <div className="text-blue-dark font-sans">
          ${Math.floor(leftVal / 100)}
        </div>
        <div className="text-blue-dark font-sans">
          ${Math.ceil(rightVal / 100)}
        </div>
      </div>
      <div ref={containerRef} className={`${s.container} my-4`} id="container">
        <div
          ref={leftKnob}
          className={`${s.knob} ${s.knob1} top-1/2 z-20`}
          id="knob1"
        />
        <div
          ref={rightKnob}
          className={`${s.knob} ${s.knob2} top-1/2 z-20`}
          id="knob2"
        />
        <div ref={rangeRef} className={`${s.range} absolute inset-0`} />
      </div>
    </div>
  )
}

export default RangeSliderGsap
