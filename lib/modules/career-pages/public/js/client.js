import { isInViewport, debounce } from 'helpers'

const animateCareer = () => {
  const html = document.querySelector('html')
  const timeline = document.querySelector('.at_timeline')
  html.style.backgroundColor = getComputedStyle(timeline).backgroundColor // fill whole page with the same color

  const items = document.querySelectorAll('.at_timeline__element')
  const callbackFn = debounce(_ => items.forEach(i => isInViewport(i) && i.classList.add('in-view')), 50)

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
  callbackFn()
}

export default animateCareer
