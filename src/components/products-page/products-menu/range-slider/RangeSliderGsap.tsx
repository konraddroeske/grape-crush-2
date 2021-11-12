import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'

import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin } from 'gsap/dist/InertiaPlugin'

import s from './RangeSliderGsap.module.scss'

const RangeSliderGsap: FunctionComponent = () => {
  const minRange = useRef<number>(55)
  const maxRange = useRef<number>(200)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const min = useRef<HTMLDivElement | null>(null)
  const max = useRef<HTMLDivElement | null>(null)

  const leftKnob = useRef<HTMLDivElement | null>(null)
  const rightKnob = useRef<HTMLDivElement | null>(null)

  const leftKnobDraggable = useRef<Draggable | null>(null)
  const rightKnobDraggable = useRef<Draggable | null>(null)

  const updateLeft = () => {
    if (min.current && leftKnobDraggable.current) {
      min.current.innerHTML = `Min: ${leftKnobDraggable.current.x}`
    }
  }

  const updateRight = () => {
    if (max.current && rightKnobDraggable.current) {
      max.current.innerHTML = `Max: ${rightKnobDraggable.current.x}`
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

  const rightKnobScope = (vars: Draggable.Vars) => {
    const { maxX } = vars
    if (leftKnobDraggable.current) {
      vars.applyBounds({
        minX: leftKnobDraggable.current.x,
        maxX,
        minY: 0,
        maxY: 0,
      })
    }
  }

  const updateSlider = () => {
    if (leftKnobDraggable.current && rightKnobDraggable.current) {
      gsap.set(leftKnobDraggable.current.target, {
        x: minRange.current,
        onUpdate: leftKnobDraggable.current.update,
        onUpdateScope: leftKnobDraggable.current,
      })

      gsap.set(rightKnobDraggable.current.target, {
        x: maxRange.current,
        onUpdate: rightKnobDraggable.current.update,
        onUpdateScope: rightKnobDraggable.current,
      })
    }

    if (min.current && max.current) {
      min.current.innerHTML = `Min: ${minRange.current}`
      max.current.innerHTML = `Max: ${maxRange.current}`
    }
  }

  useEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin)

    if (containerRef.current) {
      leftKnobDraggable.current = new Draggable(leftKnob.current, {
        type: 'x',
        bounds: containerRef.current,
        onDrag: updateLeft,
        onPress() {
          leftKnobScope(this)
        },
      })

      rightKnobDraggable.current = new Draggable(rightKnob.current, {
        type: 'x',
        bounds: containerRef.current,
        onDrag: updateRight,
        onPress() {
          rightKnobScope(this)
        },
      })

      updateSlider()
    }
  }, [])

  return (
    <div className="h-60">
      <div id="min">Min: 0</div>
      <div id="max">Max: 0</div>
      <div ref={containerRef} className={s.container} id="container">
        <div ref={leftKnob} className={`${s.knob} ${s.knob1}`} id="knob1" />
        <div ref={rightKnob} className={`${s.knob} ${s.knob2}`} id="knob2" />
      </div>
    </div>
  )
}

export default RangeSliderGsap
