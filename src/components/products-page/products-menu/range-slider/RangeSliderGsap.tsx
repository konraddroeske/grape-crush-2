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
  maxPrice: number
}

const RangeSliderGsap: FunctionComponent<Props> = ({ maxPrice }) => {
  const dispatch = useDispatch()
  const { priceRangeMin, priceRangeMax } = useSelector(selectProducts())

  const containerRef = useRef<HTMLDivElement | null>(null)
  const rangeRef = useRef<HTMLDivElement | null>(null)
  const leftKnob = useRef<HTMLDivElement | null>(null)
  const rightKnob = useRef<HTMLDivElement | null>(null)

  const rangeWidth = useRef<number>(0)

  const leftKnobDraggable = useRef<Draggable | null>(null)
  const rightKnobDraggable = useRef<Draggable | null>(null)

  const [leftVal, setLeftVal] = useState<number>(priceRangeMin)
  const [rightVal, setRightVal] = useState<number>(priceRangeMax || maxPrice)

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
        left: `calc(${leftKnobDraggable.current.x}px + ${remToPixels(1)}`,
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
        maxX: rightKnobDraggable.current.x - remToPixels(1.7),
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
        minX: leftKnobDraggable.current.x + remToPixels(1.7),
        maxX: resizedMax,
        minY: 0,
        maxY: 0,
      })
    }
  }, [])

  const updateSlider = useCallback(
    (leftPrice: number, rightPrice: number) => {
      if (
        leftKnobDraggable.current &&
        rightKnobDraggable.current &&
        containerRef.current
      ) {
        setWidth()

        const leftX = (leftPrice / maxPrice) * rangeWidth.current
        const rightX =
          ((rightPrice || maxPrice) / maxPrice) * rangeWidth.current

        gsap.set(leftKnobDraggable.current.target, {
          x: leftX,
          y: '-50%',
          opacity: 1,
          onUpdate: () => {
            leftKnobDraggable.current?.update()
          },
        })

        gsap.set(rightKnobDraggable.current.target, {
          x: rightX,
          y: '-50%',
          opacity: 1,
          onUpdate: () => {
            rightKnobDraggable.current?.update()
          },
        })

        gsap.set(rangeRef.current, {
          left: `calc(${leftX}px + ${remToPixels(1)}px)`,
          right: `calc(100% - ${rightX}px)`,
        })
      }
    },
    [maxPrice]
  )

  const handleResize = () => {
    setWidth()

    if (leftKnobDraggable.current && rightKnobDraggable.current) {
      updateSlider(priceRangeMin || leftVal, priceRangeMax || rightVal)

      leftKnobDraggable.current.kill()
      rightKnobDraggable.current.kill()

      initDraggable()
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedResize = useCallback(debounce(handleResize, 50), [
    leftVal,
    rightVal,
    priceRangeMin,
    priceRangeMax,
  ])

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

    if (priceRangeMax) {
      setLeftVal(priceRangeMin)
      setRightVal(priceRangeMax)
      updateSlider(priceRangeMin, priceRangeMax)
    }

    if (
      containerRef.current &&
      !leftKnobDraggable.current &&
      !rightKnobDraggable.current &&
      leftKnob.current &&
      rightKnob.current
    ) {
      initDraggable()
      updateSlider(priceRangeMin, priceRangeMax || maxPrice)
    }
  }, [updateSlider, initDraggable, priceRangeMin, priceRangeMax, maxPrice])

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        <div className="text-blue-dark text-sm font-sans">
          ${Math.floor(leftVal / 100)}
        </div>
        <div className="text-blue-dark text-sm font-sans">
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
