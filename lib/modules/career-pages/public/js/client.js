import { Back, TweenMax } from 'gsap'
import { isInViewport, debounce } from 'helpers'

const animateCareer = () => {
  const html = document.querySelector('html')
  const items = document.querySelectorAll('.at_timeline__element')
  const timeline = document.querySelector('.at_timeline')
  const callbackFn = debounce(_ => items.forEach(i => isInViewport(i) && i.classList.add('in-view')), 50)

  TweenMax.to(timeline, 1, {
    height: '100vh',
    ease: Back.easeInOut,
    immediateRender: true,
    autoCSS: true,
    onComplete: () => {
      html.style.backgroundColor = getComputedStyle(timeline).backgroundColor // fill whole page with the same color
      callbackFn()
    },
  })

  const addEventListeners = _ => {
    window.addEventListener('resize', callbackFn)
    window.addEventListener('scroll', callbackFn)
  }

  const removeEventListeners = _ => {
    window.removeEventListener('resize', callbackFn)
    window.removeEventListener('scroll', callbackFn)
  }

  removeEventListeners()
  addEventListeners()
}

export default animateCareer
