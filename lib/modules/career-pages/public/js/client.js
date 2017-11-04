import { debounce, isElementInViewport, titlePosition } from 'helpers/utils'
import { replaceInnerHTML } from 'helpers/pageHistory'
import ajaxLoad from 'helpers/ajax'

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
  titlePosition()

  // fill whole page with the same color
  at.style.backgroundColor = getComputedStyle(timeline).backgroundColor
}

export default animateCareer
