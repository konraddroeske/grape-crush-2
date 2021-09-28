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
