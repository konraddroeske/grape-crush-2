import gsap from 'gsap'

export const buttonExpand = (
  element: HTMLDivElement | HTMLButtonElement | null,
  color = '#2c148e'
) => {
  gsap.to(element, {
    scale: 1.1,
    duration: 0.15,
    boxShadow: `0.3rem 0.3rem ${color}`,
  })
}

export const buttonContract = (
  element: HTMLDivElement | HTMLButtonElement | null,
  color = '#2c148e'
) => {
  gsap.to(element, {
    scale: 1,
    duration: 0.15,
    boxShadow: `0.2rem 0.2rem ${color}`,
  })
}

export const modalSlideUp = (element: HTMLElement) => {
  gsap.to(element, {
    y: 0,
    opacity: 1,
    duration: 0.3,
    delay: 1,
    ease: 'back.out(1.5)',
  })
}

export const buttonSlideIn = (element: HTMLElement) => {
  gsap.to(element, {
    y: 0,
    opacity: 1,
    duration: 0.3,
    delay: 0.2,
    ease: 'back.out(0.5)',
  })
}

export const buttonSlideOut = (element: HTMLElement) => {
  gsap.to(element, {
    y: '1rem',
    opacity: 0,
    duration: 0.2,
    ease: 'back.out(0.5)',
  })
}

export const getRandomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export const headlineTextIn = (splitHeadline: SplitText) => {
  splitHeadline.chars.forEach((char) => {
    const ease = getRandomInRange(1.5, 2.5)
    const delay = getRandomInRange(0, 0.2)

    gsap.to(char, {
      duration: 0.5 - delay,
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      ease: `back.out(${ease})`,
      delay,
    })
  })
}

export const headlineTextOut = (splitHeadline: SplitText) => {
  splitHeadline.chars.forEach((char) => {
    const yPos = getRandomInRange(3, 8)
    const xPos = getRandomInRange(-3, 3)
    const scale = getRandomInRange(0.1, 0.3)
    const ease = getRandomInRange(1.5, 2.5)
    const delay = getRandomInRange(0, 0.1)

    gsap.to(char, {
      duration: 0.3 - delay,
      opacity: 0,
      y: `${yPos}rem`,
      x: `${xPos}rem`,
      scale,
      ease: `back.out(${ease})`,
      delay,
    })
  })
}
