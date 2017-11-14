import { debounce, isElementInViewport } from 'helpers/utils'

const animateCareer = () => {
  const at = document.querySelector('.at')
  const timeline = document.querySelector('.timeline')
  const items = document.querySelectorAll('.timeline > ul > li')

  const callbackFn = debounce(
    _ => items.forEach(i => (isElementInViewport(i) ? i.classList.add('in-view') : null)),
    250,
  )

  // listen for events
  window.addEventListener('resize', callbackFn)
  window.addEventListener('scroll', callbackFn)
  callbackFn()

  // fill whole page with the same color
  at.style.backgroundColor = getComputedStyle(timeline).backgroundColor
}

export default animateCareer
