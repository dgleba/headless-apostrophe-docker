import { isInViewport, debounce } from 'helpers/utils'

let callbackFn

const addEventListeners = items => {
  callbackFn = debounce(_ => items.forEach(i => (isInViewport(i) ? i.classList.add('in-view') : null)), 50)

  // listen for events
  window.addEventListener('resize', callbackFn)
  window.addEventListener('scroll', callbackFn)
  callbackFn()
}

const removeEventListeners = _ => {
  document.querySelector('html').style = 'none' // remove styling put on career pages
  window.removeEventListener('resize', callbackFn)
  window.removeEventListener('scroll', callbackFn)
}

const animateCareer = () => {
  const html = document.querySelector('html')
  const timeline = document.querySelector('.at_timeline')
  html.style.backgroundColor = getComputedStyle(timeline).backgroundColor // fill whole page with the same color

  const items = document.querySelectorAll('.at_timeline__element')
  removeEventListeners()
  addEventListeners(items)
}

export default animateCareer
